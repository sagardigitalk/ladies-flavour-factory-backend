const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { protect, checkPermission } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', protect, checkPermission('view_products'), getProducts);
router.post('/', protect, checkPermission('create_product'), upload.single('image'), createProduct);

router.get('/:id', protect, checkPermission('view_products'), getProductById);
router.put('/:id', protect, checkPermission('edit_product'), upload.single('image'), updateProduct);
router.delete('/:id', protect, checkPermission('delete_product'), deleteProduct);

module.exports = router;
