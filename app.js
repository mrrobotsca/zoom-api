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


const meetings = require('./routers/meetings');
const users = require('./routers/users');
const rooms = require('./routers/rooms');
const pastMeetings = require('./routers/pastMeetings');

const meetingWebhook = require('./webhooks/meeting');
const recordingWebhook = require('./webhooks/recording');

/* Routes */

app.use('/meetings', meetings);
app.use('/past_meetings', pastMeetings);
app.use('/users', users);
app.use('/rooms', rooms);
app.use('/meetingEvents', meetingWebhook);
app.use('/recordingEvents', recordingWebhook);




app.all('*', function(req, res) {
    res.send("Path not set.")

});


app.listen(PORT , ()=>{
    console.log("Zoom Api Server Server Has Started!",IP,PORT );
 });