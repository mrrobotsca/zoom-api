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

  
  
  //Get details on a past meeting.
  //done
router.get('/:meetingUUID', (req, res) => {
    meeting_uuid = req.params.meetingUUID
    //Store the options for Zoom API which will be used to make an API call later.
    var options = {
      //You can use a different uri if you're making an API call to a different Zoom endpoint.
      uri: "https://api.zoom.us/v2/past_meetings/"+meetingUUID, 
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
          console.log('Room reponse', response);
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

  //Retrieve information on participants from a past meeting.
  //done
router.get('/:meetingUUID/participants', (req, res) => {
    meeting_uuid = req.params.meetingUUID
    //Store the options for Zoom API which will be used to make an API call later.
    var options = {
      //You can use a different uri if you're making an API call to a different Zoom endpoint.
      uri: "https://api.zoom.us/v2/past_meetings/"+meetingUUID+"/participants", 
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
          console.log('Room reponse', response);
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


module.exports = router;