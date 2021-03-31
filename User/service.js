const dao = require("../Dao");
const responseHandler = require("../Util/responseHandler");
const bcrypt = require("bcrypt");
const { Users } = require("../Models/Users");
const { http_codes, message, config, mail } = require("../Util/constant");
const { generateAuthToken, validateToken } = require("../Util/jwtService");
const mailService = require('../Util/mailService');


async function registerUser(req) {
    try {
        // check user Already Register or Not
        let userDetail = await dao.findOne(Users, { email: req.body.email });
        if (userDetail) {
            let error = responseHandler.error(http_codes.BAD_REQUEST, message.ERROR.USER_ALREADY_EXIST);
            return error;
        }

        let payload = req.body;

        // encrypt the password
        const salt = await bcrypt.genSalt(parseInt(config.bcrypt_salt));
        payload.password = await bcrypt.hash(payload.password, salt);

        // register user
        let newUser = new Users(payload);
        userDetail = await dao.save(newUser);

        // generate auth token
        let token = await generateAuthToken(userDetail);

        let responseData = {
            token: token,
            userDetail: userDetail
        }

        // send welcome mail
        mailService.sendMail(userDetail.email, mail.SUBJECT.WELCOME, mail.BODY.WELCOME );

        return responseHandler.success(http_codes.OK, message.SUCCESS.REGISTERED_USER, responseData);

    }
    catch (err) {
        console.log({ err })
        return responseHandler.error(http_codes.INTERNAL_SERVER_ERROR, message.ERROR.INTERNAL_SERVER_ERROR);
    }
}

async function login(req) {

    try {
        // check user exist or Not
        let userDetail = await dao.findOne(Users, { email: req.body.email });
        if (!userDetail) {
            let error = responseHandler.error(http_codes.BAD_REQUEST, message.ERROR.USER_NOT_FOUND);
            return error;
        }

        // validate password
        const validPassword = await bcrypt.compare(req.body.password, userDetail.password);
        if (!validPassword) {
            let error = responseHandler.error(http_codes.BAD_REQUEST, message.ERROR.INCORRECT_PASSWORD);
            return error;
        }

        // generate auth token
        let token = await generateAuthToken(userDetail);

        let responseData = {
            token: token,
            userDetail: userDetail
        }

        return responseHandler.success(http_codes.OK, message.SUCCESS.REGISTERED_USER, responseData);
    }
    catch (err) {
        console.log({ err })
        return responseHandler.error(http_codes.INTERNAL_SERVER_ERROR, message.ERROR.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    registerUser,
    login
}