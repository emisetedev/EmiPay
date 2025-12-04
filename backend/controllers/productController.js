const db = require('../models');
const { Product, Payment } = db;

exports.getUserProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ where: { user_id: req.userId } });
    res.json({ products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar produtos' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Produto não encontrado' });
    res.json({ product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar produto' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const data = req.body;
    data.user_id = req.userId;
    const product = await Product.create(data);
    res.status(201).json({ product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Produto não encontrado' });
    if (product.user_id !== req.userId) return res.status(403).json({ error: 'Sem permissão' });
    await product.update(req.body);
    res.json({ product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Produto não encontrado' });
    if (product.user_id !== req.userId) return res.status(403).json({ error: 'Sem permissão' });
    await product.destroy();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao deletar produto' });
  }
};

exports.toggleProductStatus = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Produto não encontrado' });
    if (product.user_id !== req.userId) return res.status(403).json({ error: 'Sem permissão' });
    product.is_active = !product.is_active;
    await product.save();
    res.json({ product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao alterar status' });
  }
};

exports.getProductPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll({ where: { product_id: req.params.id } });
    res.json({ payments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar pagamentos do produto' });
  }
};

exports.generateCheckoutLink = async (req, res) => {
  try {
    // Placeholder: create a payment record and return a fake checkout link
    const payment = await Payment.create({
      user_id: req.userId,
      product_id: req.params.id,
      amount: req.body.amount || 0,
      payment_method: req.body.payment_method || 'card',
      checkout_type: 'checkout_link',
      checkout_link: `https://example.com/checkout/${Date.now()}`
    });
    res.status(201).json({ checkout_link: payment.checkout_link, payment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao gerar checkout link' });
  }
};

exports.getProductStats = async (req, res) => {
  try {
    const payments = await Payment.findAll({ where: { product_id: req.params.id } });
    const count = payments.length;
    const total = payments.reduce((s, p) => s + Number(p.amount || 0), 0);
    res.json({ count, total: Number(total.toFixed(2)) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar estatísticas' });
  }
};
