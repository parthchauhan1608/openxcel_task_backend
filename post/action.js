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

function getPostById(req){
    return service.getPostById(req);
}

module.exports = {
    createPost,
    getPost,
    commentOnPost,
    getPostById
};