const express = require('express');

const router = express.Router();
const asyncHandler = require('../middleware/asyncHandler');

const {
  createRoom,
  getAllRoom,
} = require('../controllers/roomControllers');

router.post('/', asyncHandler(createRoom));
router.get('/', asyncHandler(getAllRoom));

module.exports = router;
