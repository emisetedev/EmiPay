const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const productController = require('../controllers/productController');
const { validateProduct } = require('../middleware/validation');

// Todas as rotas exigem autenticação
router.use(auth);

// GET /api/products - Listar produtos do usuário
router.get('/', productController.getUserProducts);

// GET /api/products/:id - Buscar produto específico
router.get('/:id', productController.getProductById);

// POST /api/products - Criar novo produto
router.post('/', validateProduct, productController.createProduct);

// PUT /api/products/:id - Atualizar produto
router.put('/:id', validateProduct, productController.updateProduct);

// DELETE /api/products/:id - Deletar produto
router.delete('/:id', productController.deleteProduct);

// PATCH /api/products/:id/status - Ativar/desativar produto
router.patch('/:id/status', productController.toggleProductStatus);

// GET /api/products/:id/payments - Pagamentos de um produto
router.get('/:id/payments', productController.getProductPayments);

// POST /api/products/:id/checkout-link - Gerar link de checkout
router.post('/:id/checkout-link', productController.generateCheckoutLink);

// GET /api/products/:id/stats - Estatísticas do produto
router.get('/:id/stats', productController.getProductStats);

module.exports = router;