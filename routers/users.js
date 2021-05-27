require('dotenv').config({ path: '../.env' });
const express = require('express');

const router = express.Router();
const asyncHandler = require('../middleware/asyncHandler');

const {

  createUser,
  getAllUsers,
  getUser,
  deleteUser,
} = require('../controllers/userControllers');

router.post('/', asyncHandler(createUser));
router.get('/', asyncHandler(getAllUsers));
router.get('/:userId', asyncHandler(getUser));
router.delete('/:userId', asyncHandler(deleteUser));

module.exports = router;
