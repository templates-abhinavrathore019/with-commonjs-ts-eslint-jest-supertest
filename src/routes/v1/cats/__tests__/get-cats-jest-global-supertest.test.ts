// won't mock as logger has been already imported form app.js
// when we setup global for supertest.
// if create supertest locally in this test file it will work.
// As we are mocking logger above before making the request.
jest.mock('../../../../utils/logger');

describe('get_cats_list_supertest_req', () => {
  it('should return cats list', async () => {
    const response = await request
      .get('/api/v/1/cats')
      .query({
        limit: 2,
        page: 1,
      }).send();

    const result = response.body;
    const { data } = result;
    const { pagination } = data;
    expect(response.statusCode).toBe(200);
    expect(result).toHaveProperty('status');
    expect(result).toHaveProperty('message');
    expect(result).toHaveProperty('data');
    expect(data).toHaveProperty('cats');
    expect(data).toHaveProperty('pagination');
    expect(pagination).toHaveProperty('meta');
  });
  it('should return both prev next in pagination info', async () => {
    const response = await request
      .get('/api/v/1/cats')
      .query({
        limit: 2,
        page: 2,
      }).send();

    const result = response.body;
    const { data } = result;
    const { pagination } = data;
    expect(response.statusCode).toBe(200);
    expect(result).toHaveProperty('status');
    expect(result).toHaveProperty('message');
    expect(result).toHaveProperty('data');
    expect(data).toHaveProperty('cats');
    expect(data).toHaveProperty('pagination');
    expect(pagination).toHaveProperty('meta');
    expect(pagination).toHaveProperty('prev');
    expect(pagination).toHaveProperty('next');
  });
  it('should return only prev in pagination info', async () => {
    const response = await request
      .get('/api/v/1/cats')
      .query({
        limit: 2,
        page: 5,
      }).send();

    const result = response.body;
    const { data } = result;
    const { pagination } = data;
    expect(response.statusCode).toBe(200);
    expect(result).toHaveProperty('status');
    expect(result).toHaveProperty('message');
    expect(result).toHaveProperty('data');
    expect(data).toHaveProperty('cats');
    expect(data).toHaveProperty('pagination');
    expect(pagination).toHaveProperty('meta');
    expect(pagination).toHaveProperty('prev');
    expect(pagination).not.toHaveProperty('next');
  });
  it('should return only next in pagination info', async () => {
    const response = await request
      .get('/api/v/1/cats')
      .query({
        limit: 2,
        page: 1,
      }).send();

    const result = response.body;
    const { data } = result;
    const { pagination } = data;
    expect(response.statusCode).toBe(200);
    expect(result).toHaveProperty('status');
    expect(result).toHaveProperty('message');
    expect(result).toHaveProperty('data');
    expect(data).toHaveProperty('cats');
    expect(data).toHaveProperty('pagination');
    expect(pagination).toHaveProperty('meta');
    expect(pagination).not.toHaveProperty('prev');
    expect(pagination).toHaveProperty('next');
  });
  it('should return invalid request data', async () => {
    const response = await request
      .get('/api/v/1/cats')
      .query({
        limit: 'two',
        page: 'one',
      }).send();

    expect(response.statusCode).toBe(400);
  });
});
