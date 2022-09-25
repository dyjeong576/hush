const productDao = require('../models/productDao')

const getProduct = async (productId) => {
    return await productDao.getProduct(productId)
}

const inputLike = async (userId, productId) => {

    doesExist = await productDao.inputLike(userId, productId);

}

const getCategoryProducts = async (categoryId) => {
    return await productDao.getCategoryProducts(categoryId)
}
const getAllProducts = async () => {
	return await productDao.getAllProducts()
}


module.exports = {
    getProduct,
    inputLike,
    getCategoryProducts,
    getAllProducts
}