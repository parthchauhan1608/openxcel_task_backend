const service = require("./service");

function createPost(req) {
    return service.createPost(req);
}

function getPost(req) {
    return service.getPost(req);
}

function commentOnPost(req) {
    return service.commentOnPost(req);
}


module.exports = {
    createPost,
    getPost,
    commentOnPost
};