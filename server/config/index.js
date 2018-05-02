/**
 * secret for generating json web token
 */
module.exports = {
  secret: process.env.NODE_ENV === 'production' ? process.env.SECRET : 'metronome secret',
};
