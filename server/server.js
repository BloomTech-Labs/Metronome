const app = require('./app');

const PORT = process.env.PORT || 3000;
const path = require('path');

// Right before your app.listen(), add this:
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

const server = app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});

module.exports = server;
