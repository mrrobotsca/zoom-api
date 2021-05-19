require('dotenv').config({path: '../.env'})
const jwt = require('jsonwebtoken');
// const config = require('./config');
const rp = require('request-promise');
const express = require('express');
const router = express.Router();

const payload = {
    iss: process.env.ZOOM_JWT_API_KEY,
    exp: ((new Date()).getTime() + 5000)
};
const token = jwt.sign(payload, process.env.ZOOM_JWT_API_SECRET);


  //done
router.post('/:userId/meetings', (req, res) => {
    userId = req.params.userId;
    //Store the options for Zoom API which will be used to make an API call later.
    var options = {
        method: 'POST',
      //You can use a different uri if you're making an API call to a different Zoom endpoint.
      uri: "https://api.zoom.us/v2/users/"+userId+"/meetings", 
      auth: {
          'bearer': token
      },
      headers: {
          'User-Agent': 'Zoom-api-Jwt-Request',
          'content-type': 'application/json'
      },
      body: req.body,
      json: true //Parse the JSON string in the response
  };
  
  //Use request-promise module's .then() method to make request calls.
  rp(options)
      .then(function (response) {
        //printing the response on the console
          console.log('Create meeting response', response);
          //console.log(typeof response);
          resp = response
          //Prettify the JSON format using pre tag and JSON.stringify
          var result = JSON.stringify(resp, null, 2)
          res.send(result);
   
      })
      .catch(function (err) {
          // API call failed...
          console.log('API call failed, reason ', err);
      });
  
  });

//List all the meetings that were scheduled for a user (meeting host).
  //done
router.get('/:userId/meetings', (req, res) => {
    userId = req.params.userId;
    //Store the options for Zoom API which will be used to make an API call later.
    var options = {
      //You can use a different uri if you're making an API call to a different Zoom endpoint.
      uri: "https://api.zoom.us/v2/users/"+userId+"/meetings", 
      auth: {
          'bearer': token
      },
      headers: {
          'User-Agent': 'Zoom-api-Jwt-Request',
          'content-type': 'application/json'
      },
      json: true //Parse the JSON string in the response
  };
  
  //Use request-promise module's .then() method to make request calls.
  rp(options)
      .then(function (response) {
        //printing the response on the console
          console.log('Meeting response', response);
          //console.log(typeof response);
          resp = response
          //Prettify the JSON format using pre tag and JSON.stringify
          var result = JSON.stringify(resp, null, 2)
          res.send(result);
   
      })
      .catch(function (err) {
          // API call failed...
          console.log('API call failed, reason ', err);
      });
  
});

//Adding a user to the account.
  //done
router.post('/', (req, res) => {
    // requests body params
    userEmail = req.body.email;
    userFirstName = req.body.first_name;
    userLastName = req.body.last_name;
    //Store the options for Zoom API which will be used to make an API call later.
    var options = {
      method: 'POST',
      uri: "https://api.zoom.us/v2/users", 
      qs: {
          status: 'active' 
      },
      auth: {
          'bearer': token
      },
      headers: {
          'User-Agent': 'Zoom-api-Jwt-Request',
          'content-type': 'application/json'
      },
      // body 
      body:{
        "action": "custCreate",
        "user_info": {
          "email": userEmail,
          "type": 1,
          "first_name": userFirstName,
          "last_name": userLastName
        }
      },
      json: true //Parse the JSON string in the response

    };
    rp(options)
      .then(function (response) {
          resp = response
          //Adding html to the page
          //Prettify the JSON format using pre tag and JSON.stringify
          var result = JSON.stringify(resp, null, 2)
          console.log(result)
          res.send(result);
      })
      .catch(function (err) {
          // API call failed...
          console.log('Failed', err);
      });
  
});


//Adding a user to the account.
  //done
router.get('/', (req, res) => {
    //Store the options for Zoom API which will be used to make an API call later.
    var options = {
      method: 'GET',
      uri: "https://api.zoom.us/v2/users", 
      qs: {
          status: 'active' 
      },
      auth: {
          'bearer': token
      },
      headers: {
          'User-Agent': 'Zoom-api-Jwt-Request',
          'content-type': 'application/json'
      },
      json: true //Parse the JSON string in the response

    };
    rp(options)
      .then(function (response) {
          resp = response
          //Adding html to the page
          //Prettify the JSON format using pre tag and JSON.stringify
          var result = JSON.stringify(resp, null, 2)
          console.log(result)
          res.send(result);
      })
      .catch(function (err) {
          // API call failed...
          console.log('Failed', err);
      });
  
});



//Get a user from the account with an specific ID
//done
router.get('/:userId', (req, res) => {

    user_id = req.params.userId;
    //Store the options for Zoom API which will be used to make an API call later.
    var options = {
      //You can use a different uri if you're making an API call to a different Zoom endpoint.
      
      uri: "https://api.zoom.us/v2/users/"+user_id, 
      qs: {
          status: 'active' 
      },
      auth: {
          'bearer': token
      },
      headers: {
          'User-Agent': 'Zoom-api-Jwt-Request',
          'content-type': 'application/json'
      },
      json: true //Parse the JSON string in the response
  };
  
  //Use request-promise module's .then() method to make request calls.
  rp(options)
      .then(function (response) {
        //printing the response on the console
          console.log('Rooms', response);
          //console.log(typeof response);
          resp = response
          //Adding html to the page
          //Prettify the JSON format using pre tag and JSON.stringify
          var result = JSON.stringify(resp, null, 2)
          res.send(result);
   
      })
      .catch(function (err) {
          // API call failed...
          console.log('API call failed, reason ', err);
      });
  
});

//Get a user from the account with an specific ID
//done
router.delete('/:userId', (req, res) => {

    user_id = req.params.userId;
    //Store the options for Zoom API which will be used to make an API call later.
    var options = {
      //You can use a different uri if you're making an API call to a different Zoom endpoint.
      method: 'DELETE',
      uri: "https://api.zoom.us/v2/users/"+user_id, 
      qs: {
        action: 'delete'
      },
      auth: {
          'bearer': token
      },
      headers: {
          'User-Agent': 'Zoom-api-Jwt-Request',
          'content-type': 'application/json'
      },
      json: true //Parse the JSON string in the response
  };
  
  //Use request-promise module's .then() method to make request calls.
  rp(options)
      .then(function (response) {
        //printing the response on the console
          console.log('Rooms', response);
          //console.log(typeof response);
          resp = response
          //Adding html to the page
          //Prettify the JSON format using pre tag and JSON.stringify
          var result = JSON.stringify(resp, null, 2)
          res.send(result);
   
      })
      .catch(function (err) {
          // API call failed...
          console.log('API call failed, reason ', err);
      });
  
});


// Get all the recordings of a specific user 
router.get('/:userId/recordings', (req, res) => {
    user_id = req.params.userId;
    //Store the options for Zoom API which will be used to make an API call later.
    var options = {
      //You can use a different uri if you're making an API call to a different Zoom endpoint.
      
      uri: "https://api.zoom.us/v2/users/"+user_id, 
      qs: {
          status: 'active' 
      },
      auth: {
          'bearer': token
      },
      headers: {
          'User-Agent': 'Zoom-api-Jwt-Request',
          'content-type': 'application/json'
      },
      json: true //Parse the JSON string in the response
  };
  
  //Use request-promise module's .then() method to make request calls.
  rp(options)
      .then(function (response) {
        //printing the response on the console
          resp = response
          //Adding html to the page
          //Prettify the JSON format using pre tag and JSON.stringify
          var result = JSON.stringify(resp, null, 2)
          res.send(result);
   
      })
      .catch(function (err) {
          // API call failed...
          console.log('API call failed, reason ', err);
      });
  
});


module.exports = router;