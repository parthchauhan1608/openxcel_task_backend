const jwt = require('jsonwebtoken');

/**
 * @description
 * Generate Auth-Token for validation.
 * @param {object} user Contain perticular user details.
 */
async function generateAuthToken(user) {
    return jwt.sign({user}, process.env.jwtPrivateKey, { expiresIn: '24h' });
}

/**
 * @description
 * Check token is valid or not.
 */
async function validateToken(token) {
    try {
        let decoded = jwt.verify(token, process.env.jwtPrivateKey);
        return decoded;
    }
    catch (err) {
        console.log({ err });
        return false;
    }
}

module.exports = {
    generateAuthToken,
    validateToken
};