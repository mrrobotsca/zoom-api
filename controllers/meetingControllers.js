/**
 * @desc    Create Meeting
 * @route   POST `/users/:userId/meetings`
 * @access  Public
 */
const { zoom } = require('../Api/zoom');

exports.createMeeting = async (req, res, next) => {
  const { userId } = req.params;
  zoom.post(`/users/${userId}/meetings`, req.body)
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

exports.getAllMeetings = async (req, res, next) => {
  const { userId } = req.params;
  zoom.get(`/users/${userId}/meetings`)
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

exports.getMeeting = async (req, res, next) => {
  const { meetingId } = req.params;
  zoom.get(`/meetings/${meetingId}`)
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

exports.modifyMeeting = async (req, res, next) => {
  const { meetingId } = req.params;
  zoom.patch(`/meetings/${meetingId}`, req.body)
    .then((response) => {
      //   console.log(response.data);
	    res.send(response.data).status(response.status);
    })
    .catch((error) => {
      // Handle Error Here
      console.error(error);
      res.send(error.response.data.message).status(error.response.status);
    });
};

exports.deleteMeeting = async (req, res, next) => {
  const { meetingId } = req.params;
  zoom.delete(`/meetings/${meetingId}`)
    .then((response) => {
      //   console.log(response.data);
	    res.send(response.data).status(response.status);
    })
    .catch((error) => {
      // Handle Error Here
      console.error(error);
      res.send(error.response.data.message).status(error.response.status);
    });
};

exports.addRegistrant = async (req, res, next) => {
  const { meetingId } = req.params;
  zoom.post(`/meetings/${meetingId}/registrants`, req.body)
    .then((response) => {
      //   console.log(response.data);
	    res.send(response.data).status(response.status);
    })
    .catch((error) => {
      // Handle Error Here
      console.error(error);
      res.send(error.response.data.message).status(error.response.status);
    });
};

exports.modifyRegistrantStatus = async (req, res, next) => {
  const { meetingId } = req.params;
  zoom.put(`/meetings/${meetingId}/registrants/status`, req.body)
    .then((response) => {
      //   console.log(response.data);
	    res.send(response.data).status(response.status);
    })
    .catch((error) => {
      // Handle Error Here
      console.error(error);
      res.send(error.response.data.message).status(error.response.status);
    });
};

exports.getMeetingRecordings = async (req, res, next) => {
  const { meetingId } = req.params;
  zoom.get(`/meetings/${meetingId}/recordings`)
    .then((response) => {
      //   console.log(response.data);
	    res.send(response.data).status(response.status);
    })
    .catch((error) => {
      // Handle Error Here
      res.send(error.response.data.message).status(error.response.status);
    });
};
