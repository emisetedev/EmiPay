const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth');
const adminController = require('../controllers/adminController');

// Todas as rotas exigem autenticação E ser admin
router.use(auth);
router.use(adminAuth);

// Dashboard administrativo
router.get('/dashboard', adminController.getDashboardStats);

// Gestão de usuários
router.get('/users', adminController.getAllUsers);
router.get('/users/:id', adminController.getUserDetails);
router.put('/users/:id/status', adminController.updateUserStatus);
router.put('/users/:id/plan', adminController.updateUserPlan);

// Gestão de pagamentos
router.get('/payments', adminController.getAllPayments);
router.get('/payments/stats', adminController.getPaymentStats);
router.post('/payments/:id/manual-review', adminController.manualPaymentReview);

// Gestão de saques
router.get('/withdrawals', adminController.getAllWithdrawals);
router.put('/withdrawals/:id/status', adminController.updateWithdrawalStatus);

// Relatórios e analytics
router.get('/reports/sales', adminController.getSalesReport);
router.get('/reports/affiliates', adminController.getAffiliateReport);
router.get('/reports/financial', adminController.getFinancialReport);

// Configurações do sistema
router.get('/settings', adminController.getSystemSettings);
router.put('/settings', adminController.updateSystemSettings);

// Logs do sistema
router.get('/logs', adminController.getSystemLogs);
router.get('/logs/webhooks', adminController.getWebhookLogs);

module.exports = router;