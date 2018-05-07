require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const { isAuthenticated } = require('./services/auth');

const app = express();
const corsOptions = {
  origin: process.env.NODE_ENV ? '' : 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));
// ... other app.use middleware setups
app.use(express.static(path.join(__dirname, '../front-end/build')));
app.use(bodyParser.json());

app.use('/api/user', userRoutes);
app.use('/api/teacher', teacherRoutes);

// Test auth route
app.get('/auth-route', isAuthenticated, (req, res) => {
  res.status(200).json({ response: 'Successfully authenticated!' });
});

module.exports = app;
