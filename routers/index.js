const express = require('express')
const router = express.Router();

const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const orderRouter = require('./orderRouter');
const reviewRouter = require('./reviewRouter');
const cartRouter = require('./cartRouter');

router.use('/user', userRouter);
router.use('/products', productRouter);
router.use('/order', orderRouter);
router.use('/cart', cartRouter);
router.use('/reviews', reviewRouter);

module.exports = router;