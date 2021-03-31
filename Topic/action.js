const service = require("./service");

function createTopic(req) {
    return service.createTopic(req);
}

function getTopic(req) {
    return service.getTopic(req);
}


module.exports = {
    createTopic,
    getTopic
};