module.exports = {
  // Planos e taxas
  PLANS: {
    FREE: {
      monthly_fee: 0,
      transaction_fee: 3.9,
      monthly_limit: 5000,
      features: ['basic_checkout', 'email_support']
    },
    GROWTH: {
      monthly_fee: 79,
      transaction_fee: 1.9,
      monthly_limit: null,
      features: ['premium_checkout', 'affiliates', 'priority_support']
    },
    PRO: {
      monthly_fee: 197,
      transaction_fee: 0.9,
      monthly_limit: null,
      features: ['white_label', 'dedicated_support', 'api_access']
    },
    CHECKOUT_STARTER: {
      monthly_fee: 0,
      transaction_fee: 2.29,
      fixed_fee: 0.49,
      monthly_limit: 50,
      features: ['checkout_links', 'basic_dashboard']
    },
    CHECKOUT_PRO: {
      monthly_fee: 0,
      transaction_fee: 1.49,
      fixed_fee: 0.29,
      monthly_limit: null,
      features: ['unlimited_links', 'api_access', 'priority_support']
    }
  },

  // Status de pagamento
  PAYMENT_STATUS: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    PAID: 'paid',
    FAILED: 'failed',
    REFUNDED: 'refunded',
    CANCELLED: 'cancelled'
  },

  // Métodos de pagamento
  PAYMENT_METHODS: {
    PIX: 'pix',
    CREDIT_CARD: 'credit_card',
    DEBIT_CARD: 'debit_card',
    BOLETO: 'boleto'
  },

  // Status de saque
  WITHDRAWAL_STATUS: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled'
  },

  // Webhook events
  WEBHOOK_EVENTS: {
    PAYMENT_CREATED: 'payment_created',
    PAYMENT_CONFIRMED: 'payment_confirmed',
    PAYMENT_FAILED: 'payment_failed',
    WITHDRAWAL_PROCESSED: 'withdrawal_processed'
  }
};