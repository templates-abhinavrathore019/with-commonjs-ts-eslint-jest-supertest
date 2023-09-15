/* eslint-disable no-console */
beforeEach(() => {
  // we are mocking same class with different values,
  // so it is better to reset the the mocks before each test.
});

afterEach(() => {
  jest.clearAllMocks();
});

beforeAll((done) => {
  done();
});

afterAll((done) => {
  // mongoose.connection.close();
  console.info('## Closing global supertest');
  closeServer();
  done();
});
