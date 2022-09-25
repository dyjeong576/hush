const cartService = require('../services/cartService')
const { catchAsync }  = require('../utils/error')

const addCart = catchAsync(async (req, res) => {

	const { productId, quantity } = req.query;
	const userId = req.userId;

	await cartService.addCart(productId, quantity, userId)

	res.status(201).json({ message : "ADDCART_SUCCESS" })
})

const listUpCart = catchAsync(async (req, res) => {
	const userId  = req.userId

  const data = await cartService.listUpCart(userId)

	res.status(200).json({ message : data })
}) 

module.exports = {
	addCart,
	listUpCart,
}