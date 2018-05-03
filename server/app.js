require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require('./routes/userRoutes');
const { isAuthenticated } = require('./services/auth');

const app = express();

// ... other app.use middleware setups
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(bodyParser.json());

// Test route to make sure everything is working
app.get('/', (req, res) => {
  res.status(200).json({ response: 'Hello World!' });
});

app.get('/auth-route', isAuthenticated, (req, res) => {
  res.status(200).json({ response: 'Successfully authenticated!' });
});

// Route connections
app.use('/api/user', authRoutes);

module.exports = app;
