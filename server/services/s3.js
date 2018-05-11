const aws = require('aws-sdk');

if (!process.env.AWS_ACCESS_KEY && !process.env.AWS_SECRET_KEY) throw new Error('AWS Keys not set in your .env file.');

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: 'us-east-1',
});

const s3 = new aws.S3({ params: { Bucket: 'labs-metronome' } });
exports.s3 = s3;
