const express = require('express');
const orderController  = require('../controllers/orderController.js');
const  { validToken } = require('../utils/auth.js');

const router = express.Router();

router.post('/', validToken, orderController.createOrder);


module.exports = router;