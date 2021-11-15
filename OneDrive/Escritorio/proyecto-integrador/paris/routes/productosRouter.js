const express = require ('express');
const router = express.Router();
const productosController = require ('../controllers/productosController')

// router.get('/', productosController.index);
router.get('/detalle/:id', productosController.detalle);
router.get('/carrito', productosController.carrito);
router.get('/ofertas', productosController.showDiscount)
router.get('/:id', productosController.showProduct);

module.exports = router;