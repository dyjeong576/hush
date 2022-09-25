const productService = require('../services/productService')
const { catchAsync }  = require('../utils/error')

const getProduct = catchAsync(async (req, res) => {
    
    const productId = req.params.productId;
    
    const products = await productService.getProduct(productId)

    res.status(200).json({ message : products })
})

const inputLike = catchAsync(async (req, res) => {

    const  userId  = req.userId;
    const productId = req.params.product_id;

    await productService.inputLike(userId, productId);

    res.status(201).json({ message : "INPUTLIKE_SUCCESS"});

})

const getCategoryProducts = catchAsync(async (req, res) => {

    const categoryId = req.params.categoryId;

    const products = await productService.getCategoryProducts(categoryId)

    res.status(200).json({ message : products })
})

const addCart = catchAsync(async (req, res) => {

	const productId = req.params.productId;
    const { quantity } = req.query;
	const userId = req.userId
	await productService.addCart(productId, quantity, userId)

	res.status(201).json({ message : "INPUTCART_SUCCESS"})
})

const getAllProducts = catchAsync(async (req, res) => {

	const products = await productService.getAllProducts();

	return res.status(200).json({ message : products });
})


module.exports = {
    getProduct,
    inputLike,
    getCategoryProducts,
    addCart,
    getAllProducts
}