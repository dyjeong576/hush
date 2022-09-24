const productsDao = require('../models/productDao')

const getProduct = async (productId) => {
    return await productsDao.getProduct(productId)
}

module.exports = {
    getProduct
}