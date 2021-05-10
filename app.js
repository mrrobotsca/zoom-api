//include required modules
require('dotenv').config({path: './.env'})
const jwt = require('jsonwebtoken');
const config = require('./config');
const rp = require('request-promise');
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const crypto = require('crypto')
const cors = require('cors')

app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.json(), cors())
app.options('*', cors());

const PORT = process.env.PORT || 4000
const IP = process.env.IP || 'localhost'

const payload = {
    iss: process.env.ZOOM_JWT_API_KEY,
    exp: ((new Date()).getTime() + 5000)
};
const token = jwt.sign(payload, process.env.ZOOM_JWT_API_SECRET);

// Create signature
app.get('/signature', (req, res) => {

    const timestamp = new Date().getTime() - 30000
    const msg = Buffer.from(process.env.ZOOM_JWT_API_KEY + req.body.meetingNumber + timestamp + req.body.role).toString('base64')
    const hash = crypto.createHmac('sha256', process.env.ZOOM_JWT_API_SECRET).update(msg).digest('base64')
    const signature = Buffer.from(`${process.env.ZOOM_JWT_API_KEY}.${req.body.meetingNumber}.${timestamp}.${req.body.role}.${hash}`).toString('base64')
  
    res.json({
      signature: signature
    })

    console.log('Token', signature)

    res.send(signature);
})


// Get rooms
app.get('/rooms', (req, res) => {
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
app.post('/users', (req, res) => {

    userEmail = req.body.email;
    userFirstName = req.body.first_name;
    userLastName = req.body.last_name;
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
      body:{
        action: "custCreate",
        user_info: {
          email: userEmail,
          type: 1,
          first_name: userFirstName,
          last_name: userLastName
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



//done
app.get('/users/:userId', (req, res) => {

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

// Get all the recordings
app.get('/users/:userId/recordings', (req, res) => {

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


// Get all the recordings from a meeting or a Webinar.
app.get('/meetings/:meetingId/recordings', (req, res) => {

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

//done
app.post('/rooms', (req, res) => {
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

  
  //done
  app.post('/users/:userId/meetings', (req, res) => {
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
  app.get('/users/:userId/meetings', (req, res) => {
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

 // Retrieve the details of a meeting.
 //Done
  app.get('/meetings/:meetingId', (req, res) => {
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
  
  app.patch('/meetings/:meetingId', (req, res) => {
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
  app.delete('/meetings/:meetingId', (req, res) => {
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

  //meeting registrant
  //done
  app.get('/meetings/:meetingId/registrants', (req, res) => {
    meetingId = req.params.meetingId;
    //Store the options for Zoom API which will be used to make an API call later.
    var options = {
      //You can use a different uri if you're making an API call to a different Zoom endpoint.
      uri: "https://api.zoom.us/v2/meetings/"+meetingId+"/registrants", 
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
  app.post('/meetings/:meetingId/registrants', (req, res) => {
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
  app.put('/meetings/:meetingId/registrants/status', (req, res) => {
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

  //Get details on a past meeting.
  //done
  app.get('/past_meetings/:meetingUUID', (req, res) => {
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
  app.get('/past_meetings/:meetingUUID/participants', (req, res) => {
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

  app.all('*', function(req, res) {
    res.send("Path not set.")
});


app.listen(PORT , ()=>{
    console.log("Zoom Api Server Server Has Started!",IP,PORT );
 });