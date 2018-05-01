const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// ... other app.use middleware setups
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(bodyParser.json());

// Test route to make sure everything is working
app.get('/', (req, res) => {
  res.status(200).json({ response: 'Hello World!' });
});

module.exports = app;
