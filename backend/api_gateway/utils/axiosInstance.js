const axios = require('axios');

module.exports = axios.create({
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json'
  }
});
