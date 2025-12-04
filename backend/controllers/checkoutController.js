const { Payment, Product, User } = require('../models');
const paymentService = require('../services/paymentService');

class CheckoutController {
  
  // Página principal do checkout
  async getCheckoutPage(req, res) {
    try {
      const { checkoutId } = req.params;
      
      // Buscar informações do checkout/pagamento
      const payment = await Payment.findOne({ 
        where: { checkout_link: checkoutId } 
      });

      if (!payment) {
        return res.status(404).json({ error: 'Checkout não encontrado' });
      }

      // Buscar produto se existir
      let product = null;
      if (payment.product_id) {
        product = await Product.findByPk(payment.product_id);
      }

      // Buscar merchant info
      const merchant = await User.findByPk(payment.user_id, {
        attributes: ['company_name', 'id']
      });

      res.json({
        success: true,
        checkout: {
          id: checkoutId,
          amount: payment.amount,
          description: payment.description,
          merchant: merchant ? merchant.company_name : null,
          product: product ? {
            name: product.name,
            description: product.description
          } : null,
          payment_methods: ['pix', 'credit_card', 'debit_card'],
          expires_at: payment.expires_at
        }
      });

    } catch (error) {
      console.error('Checkout page error:', error);
      res.status(500).json({ error: 'Erro ao carregar checkout' });
    }
  }

  // Processar pagamento no checkout
  async processCheckoutPayment(req, res) {
    try {
      const { checkoutId } = req.params;
      const { payment_method, customer_info, installments = 1 } = req.body;

      // Buscar pagamento
      const payment = await Payment.findOne({ 
        where: { checkout_link: checkoutId } 
      });

      if (!payment) {
        return res.status(404).json({ error: 'Checkout não encontrado' });
      }

      if (payment.status !== 'pending') {
        return res.status(400).json({ error: 'Este pagamento já foi processado' });
      }

      // Processar pagamento baseado no método
      let result;
      if (payment_method === 'pix') {
        result = await paymentService.processPixPayment(payment, customer_info);
      } else if (['credit_card', 'debit_card'].includes(payment_method)) {
        result = await paymentService.processCardPayment(payment, customer_info, installments);
      } else {
        return res.status(400).json({ error: 'Método de pagamento não suportado' });
      }

      res.json({
        success: true,
        payment: {
          id: payment.id,
          status: result.status,
          ...(result.pix_qr_code && { pix_qr_code: result.pix_qr_code }),
          ...(result.pix_code && { pix_code: result.pix_code }),
          ...(result.checkout_url && { checkout_url: result.checkout_url })
        }
      });

    } catch (error) {
      console.error('Checkout process error:', error);
      res.status(500).json({ error: 'Erro ao processar pagamento' });
    }
  }

  // Status do checkout
  async getCheckoutStatus(req, res) {
    try {
      const { checkoutId } = req.params;

      const payment = await Payment.findOne({ 
        where: { checkout_link: checkoutId },
        attributes: ['id', 'status', 'amount', 'payment_method', 'paid_at']
      });

      if (!payment) {
        return res.status(404).json({ error: 'Checkout não encontrado' });
      }

      res.json({
        success: true,
        payment: {
          status: payment.status,
          amount: payment.amount,
          payment_method: payment.payment_method,
          paid_at: payment.paid_at
        }
      });

    } catch (error) {
      console.error('Checkout status error:', error);
      res.status(500).json({ error: 'Erro ao buscar status' });
    }
  }

  // Webhook para PIX
  async handlePixWebhook(req, res) {
    try {
      const { checkoutId } = req.params;
      const webhookData = req.body;

      // Processar webhook do PIX
      await paymentService.processPixWebhook(checkoutId, webhookData);

      res.status(200).json({ received: true });
    } catch (error) {
      console.error('PIX webhook error:', error);
      res.status(500).json({ error: 'Erro ao processar webhook' });
    }
  }

  // Preview do checkout (para o merchant)
  async previewCheckout(req, res) {
    try {
      const { checkoutId } = req.params;

      // Verificar se o usuário é o dono do checkout
      const payment = await Payment.findOne({ 
        where: { 
          checkout_link: checkoutId,
          user_id: req.user.id 
        } 
      });

      if (!payment) {
        return res.status(404).json({ error: 'Checkout não encontrado' });
      }

      res.json({
        success: true,
        preview: {
          checkout_url: `${process.env.FRONTEND_URL}/checkout/${checkoutId}`,
          qr_code_url: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`${process.env.FRONTEND_URL}/checkout/${checkoutId}`)}`,
          embed_code: `<iframe src="${process.env.FRONTEND_URL}/checkout/${checkoutId}" width="100%" height="600" frameborder="0"></iframe>`
        }
      });

    } catch (error) {
      console.error('Checkout preview error:', error);
      res.status(500).json({ error: 'Erro ao gerar preview' });
    }
  }

  // Salvar dados do cliente (opcional)
  async saveCustomerData(req, res) {
    try {
      const { checkoutId } = req.params;
      const { email, name, document } = req.body;

      // Buscar pagamento
      const payment = await Payment.findOne({ 
        where: { checkout_link: checkoutId } 
      });

      if (!payment) {
        return res.status(404).json({ error: 'Checkout não encontrado' });
      }

      // Atualizar dados do cliente
      await payment.update({
        customer_email: email,
        customer_name: name,
        customer_document: document
      });

      res.json({ success: true, message: 'Dados salvos com sucesso' });

    } catch (error) {
      console.error('Save customer error:', error);
      res.status(500).json({ error: 'Erro ao salvar dados' });
    }
  }

  // Analytics do checkout
  async getCheckoutAnalytics(req, res) {
    try {
      const { checkoutId } = req.params;

      const payment = await Payment.findOne({ 
        where: { 
          checkout_link: checkoutId,
          user_id: req.user.id 
        } 
      });

      if (!payment) {
        return res.status(404).json({ error: 'Checkout não encontrado' });
      }

      // Buscar estatísticas (views, conversões, etc)
      // Implementar lógica de analytics aqui

      res.json({
        success: true,
        analytics: {
          views: 150,
          conversions: 23,
          conversion_rate: '15.3%',
          total_amount: payment.amount * 23
        }
      });

    } catch (error) {
      console.error('Checkout analytics error:', error);
      res.status(500).json({ error: 'Erro ao buscar analytics' });
    }
  }
}

module.exports = new CheckoutController();