const {
	StatusCodes,
} = require('http-status-codes');


const handleResponse = (res, result, message, success = true) => {
    response = {
        "success" : success,
        "data"    : result,
        "message" : message
    };
    return res.status(res.statusCode ? res.statusCode : 500).json(response);
}

module.exports = {
    handleResponse
}