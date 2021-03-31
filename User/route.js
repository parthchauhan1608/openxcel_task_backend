const express = require("express");
const router = express.Router();

const middleware = require("./middleware");
const action = require("./action");

router.post('/register', [middleware.registerUser], async (req, res) => {
    let result = await action.registerUser(req);
    res.status(result.code).send(result);
});

router.post('/login', [middleware.login], async (req, res) => {
    let result = await action.login(req);
    res.status(result.code).send(result);
});

module.exports = router;