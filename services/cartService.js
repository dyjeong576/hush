const cartDao = require('../models/cartDao')

const addCart = async (productId, quantity, userId) => {

	return await cartDao.addCart(productId, quantity, userId)
}

const listUpCart = (userId) => {

  return cartDao.listUpCart(userId)
}

module.exports = {
  addCart,
  listUpCart
}