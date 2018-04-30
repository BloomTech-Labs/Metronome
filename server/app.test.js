const supertest = require('supertest');
const app = require('./app');

const request = supertest(app);

describe('[GET] / ', () => {
  it('Should return "Hello World!" with a 200 OK response', (done) => {
    request.get('/').expect(200).expect({ response: 'Hello World!' }, done);
  });
});