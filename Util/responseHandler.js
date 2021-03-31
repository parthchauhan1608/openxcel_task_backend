
function success(http_code, message, data) {
    return {
        code: http_code,
        message: message,
        data: data
    };
}

function error(http_code, error) {
    return {
        code: http_code,
        message: error
    }
}

module.exports = {
    success,
    error
};