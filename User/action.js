const service = require("./service");

function registerUser(req) {
    return service.registerUser(req);
}

function login(req) {
    return service.login(req);
}

module.exports = {
    registerUser,
    login
};