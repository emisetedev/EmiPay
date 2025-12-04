const asaasService = require('../src/services/asaasService');
const db = require('../models');
const { Payment, User, Transaction } = db;

class PaymentServiceWrapper {
  // Processar pagamento via PIX usando Asaas
  async processPixPayment(payment, customerInfo) {
    try {
      const asaasPayload = {
        customer: customerInfo.document || customerInfo.email || payment.customer_document || undefined,
        billingType: 'PIX',
        value: Number(payment.amount),
        dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        description: payment.description || 'Pagamento via PIX'
      };

      const asaasResp = await asaasService.createPayment(asaasPayload);

      // Mapear resposta para o modelo local
      if (asaasResp) {
        payment.external_id = asaasResp.id || payment.external_id;
        payment.pix_code = asaasResp.pixCode || asaasResp.pix_code || asaasResp.barCode || payment.pix_code;
        payment.pix_qr_code = asaasResp.pixPayload || asaasResp.pix_qr_code || payment.pix_qr_code;
        payment.checkout_link = payment.checkout_link || (asaasResp.invoiceUrl || asaasResp.invoice_url || payment.checkout_link);
        payment.status = 'pending';
        await payment.save();
      }

      return {
        status: payment.status,
        pix_code: payment.pix_code,
        pix_qr_code: payment.pix_qr_code,
        checkout_url: payment.checkout_link
      };
    } catch (err) {
      console.error('processPixPayment error:', err);
      throw err;
    }
  }

  // Processar pagamento por cartão — retorna URL de checkout quando aplicável
  async processCardPayment(payment, customerInfo, installments = 1) {
    try {
      const asaasPayload = {
        customer: customerInfo.document || customerInfo.email || payment.customer_document || undefined,
        billingType: 'CREDIT_CARD',
        value: Number(payment.amount),
        description: payment.description || 'Pagamento cartão',
        installments: installments
      };

      const asaasResp = await asaasService.createPayment(asaasPayload);

      if (asaasResp) {
        payment.external_id = asaasResp.id || payment.external_id;
        payment.checkout_link = payment.checkout_link || (asaasResp.invoiceUrl || asaasResp.invoice_url || payment.checkout_link);
        payment.status = 'pending';
        await payment.save();
      }

      return {
        status: payment.status,
        checkout_url: payment.checkout_link
      };
    } catch (err) {
      console.error('processCardPayment error:', err);
      throw err;
    }
  }

  // Webhook específico para PIX (or generic payload) — recebe checkoutId (slug) e payload
  async processPixWebhook(checkoutId, webhookData) {
    try {
      // Tentar achar por checkout_link ou external_id
      let payment = await Payment.findOne({ where: { checkout_link: checkoutId } });
      if (!payment) {
        payment = await Payment.findOne({ where: { external_id: checkoutId } });
      }

      if (!payment) {
        // Também checar payload for id
        const extId = webhookData?.payment?.id || webhookData?.id || webhookData?.external_id;
        if (extId) {
          payment = await Payment.findOne({ where: { external_id: extId } });
        }
      }

      if (!payment) {
        console.warn('processPixWebhook: payment not found for', checkoutId);
        return null;
      }

      // Mapear evento se existir
      const event = webhookData.event || webhookData.type || webhookData.status;
      if (event === 'PAYMENT_RECEIVED' || /paid/i.test(String(event || ''))) {
        payment.status = 'paid';
        payment.paid_at = new Date();

        // Atualizar saldo do usuário e criar transação
        const user = await User.findByPk(payment.user_id);
        if (user) {
          const netAmount = payment.net_amount ? Number(payment.net_amount) : (payment.amount ? Number(payment.amount) - (payment.fee_amount ? Number(payment.fee_amount) : 0) : 0);
          const balanceBefore = Number(user.balance || 0);
          user.balance = Number((balanceBefore + netAmount).toFixed(2));
          user.available_balance = Number(((user.available_balance || 0) + netAmount).toFixed(2));
          await user.save();

          await Transaction.create({
            user_id: user.id,
            payment_id: payment.id,
            type: 'payment',
            amount: netAmount,
            balance_before: balanceBefore,
            balance_after: user.balance,
            description: 'Pagamento PIX recebido',
            metadata: { webhook: webhookData }
          });
        }
      } else if (/overdue|cancel|failed/i.test(String(event || ''))) {
        payment.status = 'failed';
      } else {
        payment.status = payment.status || 'pending';
      }

      await payment.save();
      return payment;
    } catch (err) {
      console.error('processPixWebhook error:', err);
      throw err;
    }
  }
}

module.exports = new PaymentServiceWrapper();
