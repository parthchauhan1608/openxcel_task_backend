const { http_codes, message } = require("../Util/constant");
const response = require("../Util/responseHandler");
const { generateAuthToken, validateToken } = require("../Util/jwtService");

function validateJWT(req, res, next) {
    if (!req.headers.authorization) {
        let error = response.error(http_codes.UNAUTHORIZED, message.ERROR.UNAUTHORIZED);
        res.status(error.code).send(error);
        return;
    }

    let checkToket = validateToken(req.headers.authorization);
    if (!checkToket) {
        let error = response.error(http_codes.UNAUTHORIZED, message.ERROR.UNAUTHORIZED);
        res.status(error.code).send(error);
        return;
    }

    next();

}

function createPost(req, res, next) {
    const payload = req.body;
    if (
        !payload.topic_id ||
        !payload.user_id ||
        !payload.name ||
        !payload.discription
    ) {
        let error = response.error(http_codes.BAD_REQUEST, message.ERROR.ERROR_REQUIRED_ALL_FIELDS);
        res.status(error.code).send(error);
    }
    else {
        next();
    }
}

function commentOnPost(req, res, next) {
    const payload = req.body;
    if (
        !payload.message ||
        !payload.user_id
    ) {
        let error = response.error(http_codes.BAD_REQUEST, message.ERROR.ERROR_REQUIRED_ALL_FIELDS);
        res.status(error.code).send(error);
    }
    else {
        next();
    }
}

module.exports = {
    validateJWT,
    createPost,
    commentOnPost
};