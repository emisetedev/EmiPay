const db = require('../models');
const { Affiliate, Transaction } = db;

exports.getUserAffiliates = async (req, res) => {
  try {
    const affiliates = await Affiliate.findAll({ where: { user_id: req.userId } });
    res.json({ affiliates });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar afiliados' });
  }
};

exports.getAffiliateStats = async (req, res) => {
  try {
    const total = await Affiliate.count({ where: { user_id: req.userId } });
    res.json({ total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao obter estatísticas' });
  }
};

exports.getAffiliateById = async (req, res) => {
  try {
    const affiliate = await Affiliate.findByPk(req.params.id);
    if (!affiliate) return res.status(404).json({ error: 'Afiliado não encontrado' });
    res.json({ affiliate });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar afiliado' });
  }
};

exports.createAffiliate = async (req, res) => {
  try {
    const data = req.body;
    data.user_id = req.userId;
    const affiliate = await Affiliate.create(data);
    res.status(201).json({ affiliate });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar afiliado' });
  }
};

exports.updateAffiliate = async (req, res) => {
  try {
    const affiliate = await Affiliate.findByPk(req.params.id);
    if (!affiliate) return res.status(404).json({ error: 'Afiliado não encontrado' });
    if (affiliate.user_id !== req.userId) return res.status(403).json({ error: 'Sem permissão' });
    await affiliate.update(req.body);
    res.json({ affiliate });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar afiliado' });
  }
};

exports.deleteAffiliate = async (req, res) => {
  try {
    const affiliate = await Affiliate.findByPk(req.params.id);
    if (!affiliate) return res.status(404).json({ error: 'Afiliado não encontrado' });
    if (affiliate.user_id !== req.userId) return res.status(403).json({ error: 'Sem permissão' });
    await affiliate.destroy();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao remover afiliado' });
  }
};

exports.toggleAffiliateStatus = async (req, res) => {
  try {
    const affiliate = await Affiliate.findByPk(req.params.id);
    if (!affiliate) return res.status(404).json({ error: 'Afiliado não encontrado' });
    affiliate.is_active = !affiliate.is_active;
    await affiliate.save();
    res.json({ affiliate });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao alterar status' });
  }
};

exports.generateAffiliateLink = async (req, res) => {
  try {
    const affiliate = await Affiliate.findByPk(req.params.id);
    if (!affiliate) return res.status(404).json({ error: 'Afiliado não encontrado' });
    const link = `${process.env.FRONTEND_URL || 'https://example.com'}/r/${affiliate.code || affiliate.affiliate_code}`;
    res.json({ link });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao gerar link' });
  }
};

exports.getAffiliateCommissions = async (req, res) => {
  try {
    const commissions = await Transaction.findAll({ where: { affiliate_id: req.params.id } });
    res.json({ commissions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar comissões' });
  }
};

exports.processPayout = async (req, res) => {
  res.status(501).json({ message: 'Not implemented' });
};

exports.getAffiliatePerformance = async (req, res) => {
  res.status(501).json({ message: 'Not implemented' });
};

exports.getCommissionSettings = async (req, res) => {
  // Return default commission settings
  res.json({ commission: { percentage: 10, fixed: 0 } });
};

exports.updateCommissionSettings = async (req, res) => {
  res.status(501).json({ message: 'Not implemented' });
};

exports.getAffiliateLinkInfo = async (req, res) => {
  try {
    const affiliate = await Affiliate.findOne({ where: { affiliate_code: req.params.affiliateCode } });
    if (!affiliate) return res.status(404).json({ error: 'Afiliado não encontrado' });
    res.json({ affiliate });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar link público' });
  }
};

exports.trackConversion = async (req, res) => {
  // Minimal tracking placeholder
  res.json({ success: true });
};
