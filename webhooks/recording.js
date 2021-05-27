require('dotenv').config({ path: '../.env' });
const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  let event;
  console.log('Recording event called', req.body.event);
  try {
    event = JSON.parse(req.body);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
  console.log(event);
  if (req.headers.authorization === process.env.VERIFICATION_TOKEN) {
    res.status(200);
    console.log('Recording Ended Webhook Recieved.');
  }
});

module.exports = router;
