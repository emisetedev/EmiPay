const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const paymentController = require('../controllers/paymentController');
const { validatePayment } = require('../middleware/validation');

// Todas as rotas exigem autenticação
router.use(auth);

// GET /api/payments - Listar pagamentos do usuário
router.get('/', paymentController.getUserPayments);

// GET /api/payments/stats - Estatísticas de pagamentos
router.get('/stats', paymentController.getPaymentStats);

// GET /api/payments/:id - Buscar pagamento específico
router.get('/:id', paymentController.getPaymentById);

// POST /api/payments/create-link - Criar link de pagamento
router.post('/create-link', validatePayment, paymentController.createPaymentLink);

// POST /api/payments/process - Processar pagamento direto (API)
router.post('/process', validatePayment, paymentController.processPayment);

// POST /api/payments/:id/refund - Estornar pagamento
router.post('/:id/refund', paymentController.refundPayment);

// POST /api/payments/:id/cancel - Cancelar pagamento pendente
router.post('/:id/cancel', paymentController.cancelPayment);

// GET /api/payments/:id/pix-qr-code - Buscar QR Code PIX (se disponível)
router.get('/:id/pix-qr-code', paymentController.getPixQrCode);

// Webhook para atualizações de status (não requer auth)
router.post('/webhook/:gateway', paymentController.handlePaymentWebhook);

// Relatórios
router.get('/reports/daily', paymentController.getDailyReport);
router.get('/reports/monthly', paymentController.getMonthlyReport);

// Exportar dados
router.get('/export/csv', paymentController.exportPaymentsCSV);

module.exports = router;