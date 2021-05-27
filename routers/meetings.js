require('dotenv').config({ path: '../.env' });
const express = require('express');

const router = express.Router();
const asyncHandler = require('../middleware/asyncHandler');

const {
  createMeeting,
  getAllMeetings,
  getMeeting,
  modifyMeeting,
  deleteMeeting,
  addRegistrant,
  modifyRegistrantStatus,
  getMeetingRecordings,
} = require('../controllers/meetingControllers');

router.post('/users/:userId/meetings', asyncHandler(createMeeting));
router.get('/users/:userId/meetings', asyncHandler(getAllMeetings));
router.get('/:meetingId', asyncHandler(getMeeting));
router.patch('/:meetingId', asyncHandler(modifyMeeting));
router.delete('/:meetingId', asyncHandler(deleteMeeting));
router.post('/:meetingId/registrants', asyncHandler(addRegistrant));
router.put('/:meetingId/registrants/status', asyncHandler(modifyRegistrantStatus));
router.get('/:meetingId/recordings', asyncHandler(getMeetingRecordings));

module.exports = router;
