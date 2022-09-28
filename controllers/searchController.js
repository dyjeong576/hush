const searchService = require('../services/searchService')
const { catchAsync }  = require('../utils/error')

const getItems = catchAsync(async (req, res) => {

    const keyWord = req.query.keyword;

    const items = await searchService.getItems(keyWord)

    res.status(200).json({ message : items })
})

module.exports = {
    getItems
}