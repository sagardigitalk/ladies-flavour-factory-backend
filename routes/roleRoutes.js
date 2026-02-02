const express = require('express');
const router = express.Router();
const {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
} = require('../controllers/roleController');
const { protect, checkPermission } = require('../middleware/authMiddleware');

// All role routes should be protected and require role management permissions
router.get('/', protect, checkPermission('manage_roles'), getRoles);
router.post('/', protect, checkPermission('manage_roles'), createRole);

router.put('/:id', protect, checkPermission('manage_roles'), updateRole);
router.delete('/:id', protect, checkPermission('manage_roles'), deleteRole);

module.exports = router;
