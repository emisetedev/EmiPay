const { Payment, User, Transaction } = require('../models');
const { generatePaymentId } = require('../utils/generators');
const asaasService = require('./asaasService');

class PaymentService {
  async createPaymentLink(userId, paymentData) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error('User not found');
      }

      // Calcular taxas baseadas no plano
      const fees = this.calculateFees(user.plan_type, paymentData.amount);
      
      // Criar payment no Asaas
      const asaasPayment = await asaasService.createPayment({
        customer: user.document,
        billingType: paymentData.payment_method.toUpperCase(),
        value: paymentData.amount,
        dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 24h
        description: paymentData.description
      });

      // Salvar no banco
      const payment = await Payment.create({
        user_id: userId,
        external_id: asaasPayment.id,
        amount: paymentData.amount,
        net_amount: fees.netAmount,
        fee_amount: fees.feeAmount,
        payment_method: paymentData.payment_method,
        checkout_type: 'checkout_link',
        checkout_link: asaasPayment.invoiceUrl,
        pix_code: asaasPayment.pixQrCode,
        pix_qr_code: asaasPayment.pixPayload,
        description: paymentData.description,
        metadata: paymentData.metadata || {},
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24h
      });

      return payment;
    } catch (error) {
      throw new Error(`Payment creation failed: ${error.message}`);
    }
  }

  calculateFees(planType, amount) {
    const plans = {
      free: { percentage: 3.9, fixed: 0 },
      growth: { percentage: 1.9, fixed: 0 },
      pro: { percentage: 0.9, fixed: 0 },
      checkout_starter: { percentage: 2.29, fixed: 0.49 },
      checkout_pro: { percentage: 1.49, fixed: 0.29 }
    };

    const plan = plans[planType] || plans.free;
    const feeAmount = (amount * plan.percentage / 100) + plan.fixed;
    const netAmount = amount - feeAmount;

    return { feeAmount, netAmount };
  }

  async processWebhook(webhookData) {
    try {
      const payment = await Payment.findOne({ 
        where: { external_id: webhookData.payment.id } 
      });

      if (!payment) {
        throw new Error('Payment not found');
      }

      // Atualizar status do pagamento
      payment.status = this.mapAsaasStatus(webhookData.event);
      if (webhookData.event === 'PAYMENT_RECEIVED') {
        payment.paid_at = new Date();
        
        // Atualizar saldo do usuário
        await this.updateUserBalance(payment.user_id, payment.net_amount);
      }

      await payment.save();
      return payment;
    } catch (error) {
      throw new Error(`Webhook processing failed: ${error.message}`);
    }
  }

  mapAsaasStatus(asaasEvent) {
    const statusMap = {
      'PAYMENT_CREATED': 'pending',
      'PAYMENT_UPDATED': 'processing',
      'PAYMENT_RECEIVED': 'paid',
      'PAYMENT_OVERDUE': 'failed',
      'PAYMENT_DELETED': 'cancelled'
    };
    return statusMap[asaasEvent] || 'pending';
  }

  async updateUserBalance(userId, amount) {
    const user = await User.findByPk(userId);
    user.balance += amount;
    user.available_balance += amount;
    await user.save();

    // Registrar transação
    await Transaction.create({
      user_id: userId,
      type: 'payment',
      amount: amount,
      balance_before: user.balance - amount,
      balance_after: user.balance,
      description: 'Payment received'
    });
  }
}

module.exports = new PaymentService();