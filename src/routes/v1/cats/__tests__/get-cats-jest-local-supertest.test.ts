/* eslint-disable no-console */
jest.mock('../../../../utils/logger');
import express from 'express';
import supertest from 'supertest';
import { rootRouter } from '../../..';

let server: any;
let requestLocal: any;
const startServer = () => {
  const app = express();
  app.use(express.json());
  app.use('/api', rootRouter);
  server = app.listen(3000, async () => {
    try {
      console.info('Listening at http://localhost:3000');
    } catch (error) {
      console.error('Cannot start application, error: ', error);
      throw error;
    }
  });
  return server;
};

describe('get_cats_list_supertest_req', () => {
  beforeAll(() => {
    // starting sever on separate port as global config for
    // supertest is using app.js which uses port 5000
    console.info('## Starting local supertest');
    requestLocal = supertest(startServer());
  });
  afterAll(() => {
    console.info('## Closing local supertest');
    server.close();
  });

  it('should return cats list', async () => {
    const response = await requestLocal
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
    const response = await requestLocal
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
    const response = await requestLocal
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
    const response = await requestLocal
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
    const response = await requestLocal
      .get('/api/v/1/cats')
      .query({
        limit: 'two',
        page: 'one',
      }).send();

    expect(response.statusCode).toBe(400);
  });
});
