const db = require('../models');
const { Payment, User } = db;
const asaasService = require('../src/services/asaasService');
const { Op } = require('sequelize');

function toCSV(rows) {
  if (!rows || rows.length === 0) return '';
  const headers = Object.keys(rows[0]);
  const lines = [headers.join(',')];
  for (const r of rows) {
    lines.push(headers.map(h => {
      const v = r[h] == null ? '' : String(r[h]).replace(/"/g, '""');
      return `"${v}"`;
    }).join(','));
  }
  return lines.join('\n');
}

exports.getUserPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll({ where: { user_id: req.userId } });
    res.json({ payments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar pagamentos' });
  }
};

exports.getPaymentStats = async (req, res) => {
  try {
    const total = await Payment.count();
    const totalAmountRow = await Payment.findAll({ attributes: [[db.sequelize.fn('sum', db.sequelize.col('amount')), 'total_amount']] });
    const total_amount = totalAmountRow[0].get('total_amount') || 0;
    const paid = await Payment.count({ where: { status: 'paid' } });
    const pending = await Payment.count({ where: { status: 'pending' } });
    res.json({ total, total_amount: Number(total_amount), paid, pending });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao gerar estatísticas' });
  }
};

exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) return res.status(404).json({ error: 'Pagamento não encontrado' });
    res.json({ payment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar pagamento' });
  }
};

exports.createPaymentLink = async (req, res) => {
  try {
    const { amount, payment_method, description, metadata } = req.body;

    const user = await User.findByPk(req.userId);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    // Prepare Asaas payload
    const dueDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const asaasPayload = {
      customer: user.document || user.cpf || user.email,
      billingType: (payment_method || 'BOLETO').toUpperCase(),
      value: amount,
      dueDate,
      description: description || 'Pagamento via EmiPay'
    };

    // Call Asaas
    let asaasPayment;
    try {
      asaasPayment = await asaasService.createPayment(asaasPayload);
    } catch (err) {
      console.error('Asaas error', err.message);
      return res.status(502).json({ error: 'Erro ao criar pagamento no Asaas', details: err.message });
    }

    // Save payment locally
    const payment = await Payment.create({
      user_id: req.userId,
      amount,
      payment_method,
      description,
      metadata: metadata || {},
      checkout_type: 'checkout_link',
      external_id: asaasPayment.id || asaasPayment.paymentId || null,
      checkout_link: asaasPayment.invoiceUrl || asaasPayment.invoice_url || null,
      pix_code: asaasPayment.pixQrCode || asaasPayment.pix_qr_code || null,
      pix_qr_code: asaasPayment.pixPayload || asaasPayment.pix_payload || null,
      status: asaasPayment.status || 'pending',
      expires_at: dueDate
    });

    res.status(201).json({ payment, external: asaasPayment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar link de pagamento' });
  }
};

exports.processPayment = async (req, res) => {
  res.status(501).json({ message: 'Not implemented' });
};

exports.refundPayment = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) return res.status(404).json({ error: 'Pagamento não encontrado' });
    payment.status = 'refunded';
    await payment.save();
    res.json({ success: true, payment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao estornar pagamento' });
  }
};

exports.cancelPayment = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) return res.status(404).json({ error: 'Pagamento não encontrado' });
    payment.status = 'cancelled';
    await payment.save();
    res.json({ success: true, payment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao cancelar pagamento' });
  }
};

exports.getPixQrCode = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) return res.status(404).json({ error: 'Pagamento não encontrado' });
    if (!payment.pix_qr_code && !payment.pix_code) return res.status(404).json({ error: 'PIX não disponível para este pagamento' });
    res.json({ pix_qr_code: payment.pix_qr_code || payment.pix_code });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao obter PIX QR' });
  }
};

exports.handlePaymentWebhook = async (req, res) => {
  try {
    const { gateway } = req.params;
    const { external_id, event } = req.body;
    const payment = await Payment.findOne({ where: { external_id } });
    if (!payment) return res.status(404).json({ error: 'Pagamento não encontrado' });
    payment.status = event === 'PAYMENT_RECEIVED' ? 'paid' : payment.status;
    await payment.save();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao processar webhook' });
  }
};

exports.getDailyReport = async (req, res) => {
  try {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const end = new Date(start.getTime() + 24 * 60 * 60 * 1000 - 1);
    const payments = await Payment.findAll({ where: { createdAt: { [Op.between]: [start, end] } } });
    const total = payments.reduce((s, p) => s + Number(p.amount || 0), 0);
    res.json({ date: start.toISOString().split('T')[0], count: payments.length, total: Number(total.toFixed(2)) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao gerar relatório diário' });
  }
};

exports.getMonthlyReport = async (req, res) => {
  try {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const payments = await Payment.findAll({ where: { createdAt: { [Op.between]: [start, end] } } });
    const total = payments.reduce((s, p) => s + Number(p.amount || 0), 0);
    res.json({ month: `${now.getFullYear()}-${now.getMonth() + 1}`, count: payments.length, total: Number(total.toFixed(2)) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao gerar relatório mensal' });
  }
};

exports.exportPaymentsCSV = async (req, res) => {
  try {
    const payments = await Payment.findAll();
    const rows = payments.map(p => ({ id: p.id, user_id: p.user_id, amount: p.amount, status: p.status, createdAt: p.createdAt }));
    const csv = toCSV(rows);
    res.setHeader('Content-disposition', 'attachment; filename=payments.csv');
    res.setHeader('Content-Type', 'text/csv');
    res.send(csv);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao exportar CSV' });
  }
};
