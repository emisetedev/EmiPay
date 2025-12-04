const express = require('express');
const router = express.Router();

// Importar todas as rotas
const authRoutes = require('./auth');
const productRoutes = require('./products');
const paymentRoutes = require('./payments');
const affiliateRoutes = require('./affiliates');
const adminRoutes = require('./admin');
const withdrawalRoutes = require('./withdrawals');
const userRoutes = require('./users');
const checkoutRoutes = require('./checkout'); // ← NOVA ROTA

// Configurar prefixes
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/payments', paymentRoutes);
router.use('/affiliates', affiliateRoutes);
router.use('/admin', adminRoutes);
router.use('/withdrawals', withdrawalRoutes);
router.use('/users', userRoutes);
router.use('/checkout', checkoutRoutes); // ← ADICIONAR

// Health check
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'EmiPay API'
  });
});

module.exports = router;