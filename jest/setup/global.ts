import { request, closeServer } from './global/supertest';

const globalSetup = () => {
  (global as any).request = request;
  (global as any).closeServer = closeServer;
};

export default globalSetup;
