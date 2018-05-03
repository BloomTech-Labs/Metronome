const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require('./routes/userRoutes');
const { isAuthenticated } = require('./services/auth');

const app = express();

// ... other app.use middleware setups
app.use(express.static(path.join(__dirname, '../front-end/build')));
app.use(bodyParser.json());

app.use('/api/user', authRoutes);

// Test route to make sure everything is working
app.get('/hello-world', (req, res) => {
  res.status(200).json({ response: 'Hello World!' });
});

app.get('/auth-route', isAuthenticated, (req, res) => {
  res.status(200).json({ response: 'Successfully authenticated!' });
});

app.get('/api/test', (req, res) => {
  res.status(200).json({ response: 'testing ' });
});

module.exports = app;
