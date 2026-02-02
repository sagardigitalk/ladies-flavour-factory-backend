const express = require('express');
const router = express.Router();
const { getInventoryReport } = require('../controllers/reportController');
const { protect, checkPermission } = require('../middleware/authMiddleware');

// Protect all routes
router.use(protect);

router.get('/inventory', checkPermission('view_reports'), getInventoryReport);

module.exports = router;
