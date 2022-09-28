const productDao = require('../models/productDao')

const getProduct = async (productId) => {
    return await productDao.getProduct(productId)
}

const inputLike = async (userId, productId) => {

    doesExist = await productDao.inputLike(userId, productId);

}

const getCategoryProducts = async (category, limit, offset) => {

    if (category == 'all') return await productDao.getAllProducts(limit, offset);
    else return await productDao.getCategoryProducts(category);
    
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