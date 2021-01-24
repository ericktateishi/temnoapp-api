/* eslint-disable no-console */
import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import routes from '@infra/http/shared/routes';
import '@providers/database/typeorm';
import '@providers/injections';
import {
  BodyParserJson,
  BodyParserUrlEncoded,
  Cors,
  Compression,
  Helmet,
  Errors,
  ApplicationError,
} from '@infra/http/shared/middlewares';

const app = express();

app.use(BodyParserJson);
app.use(BodyParserUrlEncoded);
app.use(Cors);
app.use(Compression);
app.use(Helmet);
app.use(routes);
app.use(Errors);
app.use(ApplicationError);
console.log('App just started!');

export default app;
