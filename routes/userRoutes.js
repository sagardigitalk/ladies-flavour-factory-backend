const express = require('express');
const router = express.Router();
const {
  authUser,
  registerUser,
  getUsers,
  deleteUser,
  updateUser,
  updateUserProfile,
} = require('../controllers/userController');
const { protect, checkPermission } = require('../middleware/authMiddleware');

router.post('/login', authUser);
router.put('/profile', protect, updateUserProfile);

router.post('/', registerUser);
router.get('/', protect, checkPermission('manage_users'), getUsers);

router.delete('/:id', protect, checkPermission('manage_users'), deleteUser);
router.put('/:id', protect, checkPermission('manage_users'), updateUser);

module.exports = router;
