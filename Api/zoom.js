const jwt = require('jsonwebtoken');
const axios = require('axios');
const http = require('http');
const https = require('https');

const payload = {
  iss: process.env.ZOOM_JWT_API_KEY,
  exp: ((new Date()).getTime() + 5000),
};
const token = jwt.sign(payload, process.env.ZOOM_JWT_API_SECRET);

exports.zoom = axios.create({
  baseURL: 'https://api.zoom.us/v2',
  timeout: 6000,
  // keepAlive pools and reuses TCP connections, so it's faster
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),
  // follow up to 10 HTTP 3xx redirects
  maxRedirects: 10,
  // cap the maximum content length we'll accept to 50MBs, just in case
  maxContentLength: 50 * 1000 * 1000,
  headers: {
    'User-Agent': 'Zoom-api-Jwt-Request',
    'content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});
