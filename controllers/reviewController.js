const reviewService  = require('../services/reviewService')
const { catchAsync }  = require('../utils/error')

const getreviews = catchAsync(async (req, res) => {
    const { productId } = req.params; 
    console.log(productId)
    const reviews = await reviewService.getreviews(productId);

    return res.status(200).json({ data : reviews });
})

module.exports = {
    getreviews
}