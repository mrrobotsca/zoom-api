require('dotenv').config({path: '../.env'})
const jwt = require('jsonwebtoken');
// const config = require('./config');
const rp = require('request-promise');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const payload = {
    iss: process.env.ZOOM_JWT_API_KEY,
    exp: ((new Date()).getTime() + 5000)
};
const token = jwt.sign(payload, process.env.ZOOM_JWT_API_SECRET);


// create meeting
router.post('/users/:userId/meetings',(req, res) => {
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


router.get('/:meetingId', (req, res) => {
    meetingId = req.params.meetingId;
    //Store the options for Zoom API which will be used to make an API call later.
    var options = {
      //You can use a different uri if you're making an API call to a different Zoom endpoint.
      uri: "https://api.zoom.us/v2/meetings/"+meetingId, 
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

  //update meeting
  
router.patch('/:meetingId', (req, res) => {
    meetingId = req.params.meetingId;
    console.log(req.body)
    //Store the options for Zoom API which will be used to make an API call later.
    var options = {
        method: 'PATCH',
      //You can use a different uri if you're making an API call to a different Zoom endpoint.
      uri: "https://api.zoom.us/v2/meetings/"+meetingId, 
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

  //delete a meeting
//done
router.delete('/:meetingId', (req, res) => {
    //store the email address of the user in the email variable
    meetingId = req.params.meetingId;
    
    //Store the options for Zoom API which will be used to make an API call later.
    var options = {
        method: 'DELETE',
      //You can use a different uri if you're making an API call to a different Zoom endpoint.
      uri: "https://api.zoom.us/v2/meetings/"+meetingId, 
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




  //add a participant for a meeting
  //done
router.post('/:meetingId/registrants', (req, res) => {
    meetingId = req.params.meetingId;
    email = req.body.email;
    first_name = req.body.first_name;
    
    //Store the options for Zoom API which will be used to make an API call later.
    var options = {
        method: 'POST',
      //You can use a different uri if you're making an API call to a different Zoom endpoint.
      uri: "https://api.zoom.us/v2/meetings/" + meetingId+ "/registrants", 
      auth: {
          'bearer': token
      },
      headers: {
          'User-Agent': 'Zoom-api-Jwt-Request',
          'content-type': 'application/json'
      },
      body: {
          email: email,
          first_name: first_name
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

  //Update a meeting registrant’s status by either approving, cancelling or denying a registrant from joining the meeting.
  //done
router.put('/:meetingId/registrants/status', (req, res) => {
    meetingId= req.params.meetingId;
    
    //Store the options for Zoom API which will be used to make an API call later.
    var options = {
        method: 'PUT',
      //You can use a different uri if you're making an API call to a different Zoom endpoint.
      uri: "https://api.zoom.us/v2/meetings/"+meetingId+"/registrants/status", 
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
          console.log('Update meeting registrant response', response);
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



router.get('/:meetingId/recordings', (req, res) => {

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


module.exports = router;