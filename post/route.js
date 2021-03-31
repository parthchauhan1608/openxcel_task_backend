const express = require("express");
const router = express.Router();

const middleware = require("./middleware");
const action = require("./action");


router.post('', [middleware.validateJWT, middleware.createPost], async (req, res) => {
    let result = await action.createPost(req);
    res.status(result.code).send(result);
})

router.get('/:topic_id', [middleware.validateJWT], async (req, res) => {
    let result = await action.getPost(req);
    res.status(result.code).send(result);
})

router.post('/comment/:post_id', [middleware.validateJWT, middleware.commentOnPost], async (req, res) => {
    let result = await action.commentOnPost(req);
    res.status(result.code).send(result);
})

router.get('/postId/:post_id', [middleware.validateJWT], async (req, res) => {
    let result = await action.getPostById(req);
    res.status(result.code).send(result);
})

module.exports = router;