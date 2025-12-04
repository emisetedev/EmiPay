const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const affiliateController = require('../controllers/affiliateController');
const validation = require('../middleware/validation');
const validateAffiliate = validation && typeof validation.validateAffiliate === 'function' ? validation.validateAffiliate : (req, res, next) => next();

// Todas as rotas exigem autenticação
router.use(auth);

// GET /api/affiliates - Listar afiliados do usuário
router.get('/', affiliateController.getUserAffiliates);

// GET /api/affiliates/stats - Estatísticas de afiliados
router.get('/stats', affiliateController.getAffiliateStats);

// GET /api/affiliates/:id - Buscar afiliado específico
router.get('/:id', affiliateController.getAffiliateById);

// POST /api/affiliates - Criar novo afiliado
router.post('/', validateAffiliate, affiliateController.createAffiliate);

// PUT /api/affiliates/:id - Atualizar afiliado
router.put('/:id', validateAffiliate, affiliateController.updateAffiliate);

// DELETE /api/affiliates/:id - Remover afiliado
router.delete('/:id', affiliateController.deleteAffiliate);

// PATCH /api/affiliates/:id/status - Ativar/desativar afiliado
router.patch('/:id/status', affiliateController.toggleAffiliateStatus);

// POST /api/affiliates/:id/generate-link - Gerar link de afiliado
router.post('/:id/generate-link', affiliateController.generateAffiliateLink);

// GET /api/affiliates/:id/commissions - Comissões de um afiliado
router.get('/:id/commissions', affiliateController.getAffiliateCommissions);

// POST /api/affiliates/:id/payout - Pagar comissões pendentes
router.post('/:id/payout', affiliateController.processPayout);

// GET /api/affiliates/:id/performance - Performance do afiliado
router.get('/:id/performance', affiliateController.getAffiliatePerformance);

// Configurações de comissão
router.get('/settings/commission', affiliateController.getCommissionSettings);
router.put('/settings/commission', affiliateController.updateCommissionSettings);

// Links de afiliado públicos (não requer auth)
router.get('/public/links/:affiliateCode', affiliateController.getAffiliateLinkInfo);

// Tracking de conversão (não requer auth)
router.post('/public/track-conversion', affiliateController.trackConversion);

module.exports = router;