const express = require('express');

const productsController  = require('../controllers/productController');

const router = express.Router();

router.get('/showproduct/:productId', productsController.getProduct)

module.exports = router;