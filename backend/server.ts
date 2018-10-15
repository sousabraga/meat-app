import * as jsonServer from 'json-server';
import { Express } from 'express';

import * as fs from 'fs';
import * as https from 'https';

import { handleAuthentication } from './auth';
import { handleAuthorization } from './authz';

const SERVER: Express = jsonServer.create();
const ROUTER = jsonServer.router('db.json');
const MIDDLEWARES = jsonServer.defaults();
const PORT: number = 3001;

// Set default middlewares (logger, static, cors and no-cache)
SERVER.use(MIDDLEWARES);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
SERVER.use(jsonServer.bodyParser);

// Middleware for authentication/login
SERVER.post('/login', handleAuthentication);

// Middleware for authorization
SERVER.use('/orders', handleAuthorization);

// Use default router
SERVER.use(ROUTER);

const OPTIONS= {
  cert: fs.readFileSync('./backend/keys/cert.pem'),
  key: fs.readFileSync('./backend/keys/key.pem')
}

https.createServer(OPTIONS, SERVER).listen(PORT, () => {
  console.log(`JSON Server is running on https://localhost:${PORT}`);
});
