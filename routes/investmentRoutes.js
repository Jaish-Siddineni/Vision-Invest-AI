const express = require('express');
const { getStockRecommendations } = require('../controllers/investmentController');

const router = express.Router();

router.get('/recommendations', getStockRecommendations);

module.exports = router;
