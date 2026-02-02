const express = require('express');
const router = express.Router();
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');
const { protect, checkPermission } = require('../middleware/authMiddleware');

router.get('/', protect, checkPermission('view_categories'), getCategories);
router.post('/', protect, checkPermission('manage_categories'), createCategory);

router.put('/:id', protect, checkPermission('manage_categories'), updateCategory);
router.delete('/:id', protect, checkPermission('manage_categories'), deleteCategory);

module.exports = router;
