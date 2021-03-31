
require("dotenv").config();

exports.http_codes = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    INTERNAL_SERVER_ERROR: 500
};

exports.message = {
    ERROR: {
        ERROR_REQUIRED_ALL_FIELDS: "Please provide all required fields.",
        USER_ALREADY_EXIST: "User already registered with email.",
        INTERNAL_SERVER_ERROR: "Internal server error.",
        USER_NOT_FOUND: "Unable to find user.",
        INCORRECT_PASSWORD: "Incorrect username or password.",
        UNAUTHORIZED: "Unauthorised access.",
        USER_NOT_FOUND: "Unable to  find user.",
        TOPIC_NOT_FOUND: "Unable to find topic.",
        POST_NOT_FOUND: "Unable to find post."
    },
    SUCCESS: {
        REGISTERED_USER: "User registration success.",
        LOGIN_SUCCESS: "Logged in success.",
        TOPIC_CREATED: "Topic created.",
        POST_CREATED: "Post created.",
        COMMENT_CREATED_ON_POST: "Comment make success.",
        SUCCESS: "Success."
    }
};

exports.Model = {
    USER: "user",
    TOPIC: "topic",
    POST: "post"
}

exports.config = {
    bcrypt_salt: process.env.BCRYPT_SALT
}

exports.mail = {
    SUBJECT: {
        WELCOME: "Welcome Mail"
    },
    BODY: {
        WELCOME: `<h2> This is welcome mail </h2>`
    }
}