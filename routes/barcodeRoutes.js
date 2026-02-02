const express = require('express');
const router = express.Router();
const { getBarcodeProducts } = require('../controllers/barcodeController');
const { protect } = require('../middleware/authMiddleware');

// Protect all routes
router.use(protect);

router.get('/products', getBarcodeProducts);

module.exports = router;
