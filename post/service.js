const dao = require("../Dao");
const responseHandler = require("../Util/responseHandler");
const { Topics } = require('../Models/Topic');
const { Users } = require('../Models/Users');
const { Posts } = require('../Models/Post');

const { http_codes, message } = require("../Util/constant");

async function createPost(req) {
    try {
        let payload = req.body;

        let userDetail = await dao.findOne(Users, { _id: payload.user_id });
        if (!userDetail) {
            let error = responseHandler.error(http_codes.BAD_REQUEST, message.ERROR.USER_NOT_FOUND);
            return error;
        }
        let topicDetail = await dao.findOne(Topics, { _id: payload.topic_id });
        if (!topicDetail) {
            let error = responseHandler.error(http_codes.BAD_REQUEST, message.ERROR.TOPIC_NOT_FOUND);
            return error;
        }

        // create topic
        let newUser = new Posts(payload);
        let post = await dao.save(newUser);

        return responseHandler.success(http_codes.OK, message.SUCCESS.POST_CREATED, post);

    }
    catch (err) {
        console.log({ err })
        return responseHandler.error(http_codes.INTERNAL_SERVER_ERROR, message.ERROR.INTERNAL_SERVER_ERROR);
    }
}

async function getPost(req) {
    try {
        let populate = [
            'user_id',
            'topic_id',
            'comment.user_id'
        ]
        let query = {
            topic_id: req.params.topic_id
        }
        let topics = await dao.findWithPopulate(Posts, query, {}, {}, populate);

        return responseHandler.success(http_codes.OK, message.SUCCESS.SUCCESS, topics);
    }
    catch (err) {
        console.log({ err })
        return responseHandler.error(http_codes.INTERNAL_SERVER_ERROR, message.ERROR.INTERNAL_SERVER_ERROR);
    }
}

async function commentOnPost(req) {
    try {
        let payload = req.body;
        payload.createdAt = new Date();

        let query = {
            _id: req.params.post_id
        };

        let postDetail = await dao.findOne(Posts, query);
        if (!postDetail) {
            let error = responseHandler.error(http_codes.BAD_REQUEST, message.ERROR.POST_NOT_FOUND);
            return error;
        }

        let update = {
            $push: {
                comment: payload
            }
        }

        let options = {
            new: true
        }
        let populate = [
            'user_id',
            'topic_id',
            'comment.user_id'
        ]
        postDetail = await dao.findandupdateWithPopulate(Posts, query, update, options, populate);

        return responseHandler.success(http_codes.OK, message.SUCCESS.COMMENT_CREATED_ON_POST, postDetail);
    }
    catch (err) {
        console.log({ err })
        return responseHandler.error(http_codes.INTERNAL_SERVER_ERROR, message.ERROR.INTERNAL_SERVER_ERROR);
    }
}

async function getPostById(req) {
    try {
        let populate = [
            'user_id',
            'topic_id',
            'comment.user_id'
        ]
        let query = {
            _id: req.params.post_id
        }
        let topics = await dao.findOne(Posts, query, {}, {}, populate);

        return responseHandler.success(http_codes.OK, message.SUCCESS.SUCCESS, topics);
    }
    catch (err) {
        console.log({ err })
        return responseHandler.error(http_codes.INTERNAL_SERVER_ERROR, message.ERROR.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createPost,
    getPost,
    commentOnPost,
    getPostById
}