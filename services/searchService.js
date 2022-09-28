const searchDao = require('../models/searchDao')

const getItems = async (keyWord) => {
    return await searchDao.getItems(keyWord)
}

module.exports = {
    getItems
}