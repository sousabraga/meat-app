"use strict";
exports.__esModule = true;
var jsonServer = require("json-server");
var fs = require("fs");
var https = require("https");
var auth_1 = require("./auth");
var authz_1 = require("./authz");
var SERVER = jsonServer.create();
var ROUTER = jsonServer.router('db.json');
var MIDDLEWARES = jsonServer.defaults();
var PORT = 3001;
// Set default middlewares (logger, static, cors and no-cache)
SERVER.use(MIDDLEWARES);
// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
SERVER.use(jsonServer.bodyParser);
// Middleware for authentication/login
SERVER.post('/login', auth_1.handleAuthentication);
// Middleware for authorization
SERVER.use('/orders', authz_1.handleAuthorization);
// Use default router
SERVER.use(ROUTER);
var OPTIONS = {
    cert: fs.readFileSync('./backend/keys/cert.pem'),
    key: fs.readFileSync('./backend/keys/key.pem')
};
https.createServer(OPTIONS, SERVER).listen(PORT, function () {
    console.log("JSON Server is running on https://localhost:" + PORT);
});
