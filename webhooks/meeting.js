require('dotenv').config({path: '../.env'})
const jwt = require('jsonwebtoken');
// const config = require('./config');
const rp = require('request-promise');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const payload = {
    iss: process.env.ZOOM_JWT_API_KEY,
    exp: ((new Date()).getTime() + 5000)
};
const token = jwt.sign(payload, process.env.ZOOM_JWT_API_SECRET);



router.post('/', bodyParser.raw({ type: 'application/json' }), (req, res) => {

    let event;
    console.log("event called",req.body,res)
    try {
        event = JSON.parse(req.body);
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
    }
    // Check to see if you received the event or not.
    console.log(event)
    if (req.headers.authorization === process.env.VERIFICATION_TOKEN) {
        res.status(200);

        console.log("Webinar Ended Webhook Recieved.") 

    }

});



module.exports = router;