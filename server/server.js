const app = require('./app');
const mongoose = require('mongoose');

// check if the app is on production mode
const isProduction = process.env.NODE_ENV === 'production';
mongoose.Promise = global.Promise;
// connect mongodb
if (isProduction) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect('mongodb://localhost/metronome');
  mongoose.set('debug', true);
}

const PORT = process.env.PORT || 8000;
const path = require('path');

// Right before your app.listen(), add this:
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../front-end', 'build', 'index.html'));
});

const server = app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});

module.exports = server;
