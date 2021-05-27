/**
 * @desc    Create Past Meeting Information
 * @route   GET /past_meetings/:meeting_uuid
 * @access  Public
 */
const { zoom } = require('../Api/zoom');

exports.createRoom = async (req, res, next) => {
  zoom.post('/rooms', req.body)
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

exports.getAllRoom = async (req, res, next) => {
  zoom.get('/rooms')
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
