const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');
const { optionalAuth } = require('../middleware/auth');

// Rotas públicas para checkout
router.get('/:checkoutId', checkoutController.getCheckoutPage);
router.get('/:checkoutId/status', checkoutController.getCheckoutStatus);

// Processamento de pagamento (público)
router.post('/:checkoutId/process', checkoutController.processCheckoutPayment);
router.post('/:checkoutId/pix-webhook', checkoutController.handlePixWebhook);

// Rotas com autenticação opcional (para usuários logados)
router.post('/:checkoutId/save-customer', optionalAuth, checkoutController.saveCustomerData);

// Preview para o merchant (requer auth)
router.get('/:checkoutId/preview', checkoutController.previewCheckout);

// Estatísticas do checkout
router.get('/:checkoutId/analytics', checkoutController.getCheckoutAnalytics);

module.exports = router;