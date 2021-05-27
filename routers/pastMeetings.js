const express = require('express');

const router = express.Router();
const asyncHandler = require('../middleware/asyncHandler');

const {
  getMeeting,
  getMeetingParticipations,

} = require('../controllers/pastMeetingControllers');

router.get('/:meetingUUID', asyncHandler(getMeeting));
router.get('/:meetingUUID/participants', asyncHandler(getMeetingParticipations));

module.exports = router;
