import supertest from 'supertest';
import { app, server } from '../../../src/app';

const request = supertest(app);
const closeServer = () => {
  server?.close(() => { });
};

export {
  request,
  closeServer,
};
