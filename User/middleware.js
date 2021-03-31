const { http_codes, message } = require("../Util/constant");
const response = require("../Util/responseHandler");


function registerUser(req, res, next) {
    const payload = req.body;
    if (
        !payload.firstName ||
        !payload.lastName ||
        !payload.email ||
        !payload.password
    ) {
        let error = response.error(http_codes.BAD_REQUEST, message.ERROR.ERROR_REQUIRED_ALL_FIELDS);
        res.status(error.code).send(error);
    }
    else {
        next();
    }
}

function login(req, res, next) {
    const payload = req.body;

    if (
        !payload.email ||
        !payload.password
    ) {
        let error = response.error(http_codes.BAD_REQUEST, message.ERROR.ERROR_REQUIRED_ALL_FIELDS);
        res.status(error.code).send(error);
    }
    else {
        next();
    }
}

module.exports = {
    registerUser,
    login
};