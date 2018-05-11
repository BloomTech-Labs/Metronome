/**
 * secret for generating json web token
 */
module.exports = {
  secret: process.env.NODE_ENV === 'production' ? process.env.SECRET : 'metronome secret',
  url: process.env.NODE_ENV === 'production' ? 'https://lambda-metronome.herokuapp.com' : 'http://localhost:3000',
};
