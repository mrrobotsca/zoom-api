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


// Get rooms
router.get('/', (req, res) => {
    var options = {
      
      uri: "https://api.zoom.us/v2/rooms", 
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
          res.send(result);
      })
      .catch(function (err) {
          // API call failed...
          console.log('Failed', err);
      });
  
});



//done
router.post('/', (req, res) => {
    //store the email address of the user in the email variable
    roomName = req.body.room;
    //check if the email was stored in the console
    typeRoom = req.body.type ;
    //Store the options for Zoom API which will be used to make an API call later.
    var options = {
        method: 'POST',
      //You can use a different uri if you're making an API call to a different Zoom endpoint.
      uri: "https://api.zoom.us/v2/rooms", 
      auth: {
          'bearer': token
      },
      headers: {
          'User-Agent': 'Zoom-api-Jwt-Request',
          'content-type': 'application/json'
      },
      body: {
            "name": roomName,
            "type": typeRoom  
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
