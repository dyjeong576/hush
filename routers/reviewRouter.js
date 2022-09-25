const express = require('express');

const reviewController = require('../controllers/reviewController');

const router = express.Router();

router.get('/:productId', reviewController.getreviews)

module.exports = router;