const supertest = require('supertest');
const app = require('../server/app');

const request = supertest(app);

describe('[GET] /', () => {
  it('Should be serving the react build html', (done) => {
    request.get('/')
      .expect(200)
      .expect('Content-Type', /html/, done);
  });
});
