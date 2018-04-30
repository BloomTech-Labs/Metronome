const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// Test route to make sure everything is working
app.get('/', (req, res) => {
  res.status(200).json({ response: 'Hello World!'});
});

module.exports = app;