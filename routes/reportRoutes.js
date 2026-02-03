const express = require('express');
const router = express.Router();
const { getInventoryReport, exportInventoryExcel, exportInventoryPDF } = require('../controllers/reportController');
const { protect, checkPermission } = require('../middleware/authMiddleware');

// Protect all routes
router.use(protect);

router.get('/inventory', checkPermission('view_reports'), getInventoryReport);
router.get('/inventory/excel', checkPermission('view_reports'), exportInventoryExcel);
router.get('/inventory/pdf', checkPermission('view_reports'), exportInventoryPDF);

module.exports = router;
