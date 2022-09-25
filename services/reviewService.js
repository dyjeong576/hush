const reviewDao = require('../models/reviewDao')

const getreviews = async (productId) => {
	return await reviewDao.getreviews(productId)
}

module.exports = {
    getreviews
}