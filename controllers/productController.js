const productsService = require('../services/productService')
const { catchAsync }  = require('../utils/error')

const getProduct = catchAsync(async (req, res) => {
    
    const productId = req.params.productId;
    
    const products = await productsService.getProduct(productId)

    res.status(200).json({ products })
})

module.exports = {
    getProduct
}