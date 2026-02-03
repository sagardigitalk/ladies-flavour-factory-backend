const express = require('express');
const router = express.Router();
const {
  getCatalogs,
  createCatalog,
  updateCatalog,
  deleteCatalog,
} = require('../controllers/catalogController');
const { protect, checkPermission } = require('../middleware/authMiddleware');

router.get('/', protect, checkPermission('view_catalog'), getCatalogs);
router.post('/', protect, checkPermission('manage_catalog'), createCatalog);

router.put('/:id', protect, checkPermission('manage_catalog'), updateCatalog);
router.delete('/:id', protect, checkPermission('manage_catalog'), deleteCatalog);

module.exports = router;