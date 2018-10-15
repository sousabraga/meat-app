"use strict";
exports.__esModule = true;
var JWT = require("jsonwebtoken");
var users_1 = require("./users");
var api_config_1 = require("./api.config");
exports.handleAuthentication = function (req, resp) {
    var user = req.body;
    if (isValid(user)) {
        var dbUser = users_1.users[user.email];
        var token = JWT.sign({
            sub: dbUser.email,
            iss: 'meat-app'
        }, api_config_1.API_CONFIG.signature);
        resp.status(200).json({
            name: dbUser.name,
            email: dbUser.email,
            accessToken: token
        });
    }
    else {
        resp.status(403).json({ message: 'Dados inválidos.' });
    }
};
function isValid(user) {
    if (!user) {
        return false;
    }
    var dbUser = users_1.users[user.email];
    return dbUser !== undefined && dbUser.matches(user);
}
