const mongoose = require('mongoose');

exports.connectToTestDb = function () {
  return new Promise((resolve, reject) => {
    mongoose.connect('mongodb://localhost/Metronome_local_test');
    const db = mongoose.connection;
    db.on('error', () => {
      console.error('connection error');
      reject();
    });
    db.once('open', resolve);
  });
};

exports.dropTestCollections = async function () {
  await mongoose.connection.db.dropDatabase();
};
