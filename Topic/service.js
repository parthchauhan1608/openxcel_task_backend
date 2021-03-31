const dao = require("../Dao");
const responseHandler = require("../Util/responseHandler");
const { Topics } = require('../Models/Topic');
const { Users } = require('../Models/Users');

const { http_codes, message } = require("../Util/constant");

async function createTopic(req) {
    try {
        let payload = req.body;

        let userDetail = await dao.findOne(Users, { _id: payload.user_id });
        if (!userDetail) {
            let error = responseHandler.error(http_codes.BAD_REQUEST, message.ERROR.USER_NOT_FOUND);
            return error;
        }

        // create topic
        let newUser = new Topics(payload);
        let topic = await dao.save(newUser);

        return responseHandler.success(http_codes.OK, message.SUCCESS.TOPIC_CREATED, topic);

    }
    catch (err) {
        console.log({ err })
        return responseHandler.error(http_codes.INTERNAL_SERVER_ERROR, message.ERROR.INTERNAL_SERVER_ERROR);
    }
}

async function getTopic(req) {
    try {
        let populate = [
            'user_id'
        ]
        let topics = await dao.findWithPopulate(Topics, {}, {}, {}, populate);

        return responseHandler.success(http_codes.OK, message.SUCCESS.TOPIC_CREATED, topics);
    }
    catch (err) {
        console.log({ err })
        return responseHandler.error(http_codes.INTERNAL_SERVER_ERROR, message.ERROR.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createTopic,
    getTopic
}