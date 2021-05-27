/**
 * @desc    Create a user
 * @route   POST /users
 * @access  Public
 */
const { zoom } = require('../Api/zoom');

exports.createUser = async (req, res, next) => {
  const options = {
    method: 'POST',
    baseURL: 'https://api.zoom.us/v2/users',
    params: {
      status: 'active',
    },
    // body
    data: {
      action: 'custCreate',
      user_info: {
        email: req.body.email,
        type: req.body.user_type,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
      },
    },
  };
  zoom.request(options)
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

exports.getAllUsers = async (req, res, next) => {
  zoom.get('/users')
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

exports.getUser = async (req, res, next) => {
  const { userId } = req.params;
  zoom.get(`/users/${userId}`)
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

exports.deleteUser = async (req, res, next) => {
  const { userId } = req.params;
  const options = {
    method: 'DELETE',
    baseURL: `https://api.zoom.us/v2/users/${userId}`,
    params: {
      action: 'delete',
    },
  };
  zoom.request(options)
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
