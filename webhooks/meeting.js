require('dotenv').config({ path: '../.env' });
const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  let event;
  console.log('Meeting event called', req.body.event);
  try {
    event = JSON.parse(req.body);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
  // Check to see if you received the event or not.
  console.log(event);
  if (req.headers.authorization === process.env.VERIFICATION_TOKEN) {
    res.status(200);
    console.log('Meeting Ended Webhook Recieved.');
  }
});

module.exports = router;
