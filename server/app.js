require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const studentRoutes = require('./routes/studentRoutes');
const { isAuthenticated } = require('./services/auth');

const app = express();
const corsOptions = {
  origin: process.env.NODE_ENV ? '' : 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, '../front-end/build')));
app.use(bodyParser.json());

app.use('/api/user', userRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/student', studentRoutes);

app.use((err, req, res, next) => {
  // Mongoose validation errors
  if (err.name === 'ValidationError') {
    const errors = Object.keys(err.errors).map(key => (
      err.errors[key].message
    ));
    if (errors.length) {
      res.status(400).json({
        errors,
      });
    }
  } else {
    // catch-all for other errors
    res.status(400).json({ errors: [err.message] });
  }

  next();
});
// Test auth route
app.get('/auth-route', isAuthenticated, (req, res) => {
  res.status(200).json({ response: 'Successfully authenticated!' });
});

module.exports = app;
