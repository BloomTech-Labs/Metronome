const supertest = require('supertest');
const app = require('../server/app');

const request = supertest(app);

describe('[GET] /hello-world ', () => {
  it('Should return "Hello World!" with a 200 OK response', (done) => {
    request.get('/hello-world').expect(200).expect({ response: 'Hello World!' }, done);
  });
});
