/**
 * @desc    Create Past Meeting Information
 * @route   GET /past_meetings/:meeting_uuid
 * @access  Public
 */
const { zoom } = require('../Api/zoom');

exports.getMeeting = async (req, res, next) => {
  // eslint-disable-next-line camelcase
  const { meeting_uuid } = req.params;
  // eslint-disable-next-line camelcase
  zoom.get(`/past_meetings/${meeting_uuid}`)
    .then((response) => {
      //   console.log(response.data);
      res.send(response.data);
    })
    .catch((error) => {
      // Handle Error Here
      console.error(error);
      res.send(error.response.data.message).status(error.response.status);
    });
};

exports.getMeetingParticipations = async (req, res, next) => {
  // eslint-disable-next-line camelcase
  const { meeting_uuid } = req.params;
  // eslint-disable-next-line camelcase
  zoom.get(`/past_meetings/${meeting_uuid}/participants`)
    .then((response) => {
      //   console.log(response.data);
      res.send(response.data);
    })
    .catch((error) => {
      // Handle Error Here
      console.error(error);
      res.send(error.response.data.message).status(error.response.status);
    });
};
