const express = require("express");
const router = express.Router();

const middleware = require("./middleware");
const action = require("./action");


router.post('', [middleware.validateJWT, middleware.createTopic], async (req, res) => {
    let result = await action.createTopic(req);
    res.status(result.code).send(result);
})

router.get('', [middleware.validateJWT], async (req, res) => {
    let result = await action.getTopic(req);
    res.status(result.code).send(result);
})

module.exports = router;