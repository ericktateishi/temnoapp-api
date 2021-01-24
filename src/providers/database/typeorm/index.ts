import { createConnections } from 'typeorm';

if (process.env.NODE_ENV !== 'test') {
  createConnections();
}
