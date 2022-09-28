const express = require('express');

const productController  = require('../controllers/productController');

const { validToken } = require('../utils/auth');

const router = express.Router();

router.get('/showproduct/:productId', productController.getProduct);

router.post('/showproduct/:product_id/like', validToken, productController.inputLike);

router.get('/', validToken, productController.getCategoryProducts);

router.post('/showproduct/:productId/addCart', validToken, productController.addCart)




module.exports = router;