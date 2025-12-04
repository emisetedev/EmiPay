const fs = require('fs');
const db = require('../models');
const { Payment, User, Transaction, WebhookLog } = db;

function mapAsaasStatus(event) {
  const map = {
    PAYMENT_CREATED: 'pending',
    PAYMENT_UPDATED: 'processing',
    PAYMENT_RECEIVED: 'paid',
    PAYMENT_OVERDUE: 'failed',
    PAYMENT_DELETED: 'cancelled'
  };
  return map[event] || 'pending';
}

async function persistWebhookLog(eventType, payload, source = 'asaas') {
  try {
    const log = await WebhookLog.create({ event_type: eventType || 'unknown', payload, source });
    return log;
  } catch (err) {
    console.error('Failed to persist webhook log', err);
    return null;
  }
}

exports.handleAsaasWebhook = async (req, res) => {
  try {
    const payload = req.body || {};
    await persistWebhookLog(payload.event || payload.eventType || 'asaas_event', payload, 'asaas');

    // Try to find payment id in payload (various shapes)
    const externalId = payload.payment?.id || payload.id || payload.object?.id || payload.data?.id || payload.paymentId || payload.payment_id;
    const event = payload.event || payload.eventType || payload.type || payload.action || payload.status;

    if (!externalId) {
      console.warn('Asaas webhook received without identifiable external payment id', payload);
      return res.status(200).json({ received: true });
    }

    const payment = await Payment.findOne({ where: { external_id: externalId } });
    if (!payment) {
      console.warn('No local payment found for external id', externalId);
      return res.status(200).json({ received: true });
    }

    const newStatus = mapAsaasStatus(event);
    payment.status = newStatus;
    if (newStatus === 'paid') {
      payment.paid_at = new Date();

      // Update user balance and create transaction
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
          description: 'Pagamento recebido via Asaas',
          metadata: { external_event: event }
        });
      }
    }

    await payment.save();
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error handling Asaas webhook', err);
    res.status(500).end();
  }
};

exports.handleStripeWebhook = async (req, res) => {
  try {
    const payload = req.body || {};
    await persistWebhookLog(payload.type || 'stripe_event', payload, 'stripe');
    // For now just acknowledge; further mapping can be added later
    res.status(200).json({ received: true });
  } catch (err) {
    console.error('Error handling Stripe webhook', err);
    res.status(500).end();
  }
};
