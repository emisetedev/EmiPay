const db = require('../models');
const { User, Payment, Withdrawal, WebhookLog } = db;

exports.getDashboardStats = async (req, res) => {
  try {
    const users = await User.count();
    const payments = await Payment.count();
    const withdrawals = await Withdrawal.count();
    res.json({ users, payments, withdrawals });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao obter dashboard' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    res.json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar usuários' });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, { attributes: { exclude: ['password'] } });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
};

exports.updateUserStatus = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    user.is_admin = req.body.is_admin === undefined ? user.is_admin : !!req.body.is_admin;
    await user.save();
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar status' });
  }
};

exports.updateUserPlan = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    user.plan_type = req.body.plan_type || user.plan_type;
    await user.save();
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar plano' });
  }
};

exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll();
    res.json({ payments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar pagamentos' });
  }
};

exports.getPaymentStats = async (req, res) => {
  try {
    const total = await Payment.count();
    res.json({ total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao obter estatísticas' });
  }
};

exports.manualPaymentReview = async (req, res) => {
  res.status(501).json({ message: 'Not implemented' });
};

exports.getAllWithdrawals = async (req, res) => {
  try {
    const withdrawals = await Withdrawal.findAll();
    res.json({ withdrawals });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar saques' });
  }
};

exports.updateWithdrawalStatus = async (req, res) => {
  res.status(501).json({ message: 'Not implemented' });
};

exports.getSalesReport = async (req, res) => { res.status(501).json({ message: 'Not implemented' }); };
exports.getAffiliateReport = async (req, res) => { res.status(501).json({ message: 'Not implemented' }); };
exports.getFinancialReport = async (req, res) => { res.status(501).json({ message: 'Not implemented' }); };

exports.getSystemSettings = async (req, res) => { res.json({ mode: 'development' }); };
exports.updateSystemSettings = async (req, res) => { res.status(501).json({ message: 'Not implemented' }); };

exports.getSystemLogs = async (req, res) => { res.status(501).json({ message: 'Not implemented' }); };
exports.getWebhookLogs = async (req, res) => {
  try {
    const logs = await WebhookLog.findAll();
    res.json({ logs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar logs' });
  }
};
