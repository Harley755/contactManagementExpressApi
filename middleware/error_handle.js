const { constants } = require("../constants");
const { handleResponse } = require("../helpers/handle_response");

const errorHandle = async(err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            //  res.json({
            //     title: 'Validation failed !',
            //     message: err.message,
            //     stackTrace: err.stack
            // });
            return handleResponse(res, null, err.message, false)
            break;
            case constants.NOT_FOUND:
                // return res.json({
                //     title: 'Not found',
                //     message: err.message,
                //     stackTrace: err.stack
                // });
                return handleResponse(res, null, err.message, false)
            break;
        case constants.UNAUTHORIZED:
            // return res.json({
            //     title: 'Unauthorized',
            //     message: err.message,
            //     stackTrace: err.stack
            // });
            return handleResponse(res, null, err.message, false)
            break;
        case constants.FORBIDDEN:
            // return res.json({
            //     title: 'Forbidden',
            //     message: err.message,
            //     stackTrace: err.stack
            // });
            return handleResponse(res, null, err.message, false)
            break;
        case constants.SERVER_ERROR:
            // return res.json({
            //     title: 'Server error',
            //     message: err.message,
            //     stackTrace: err.stack
            // });
            return handleResponse(res, null, err.message, false)
            break;
    
        default:
            console.log('No Error, all good!');
            
            break;
    }
    // return res.json({ title: 'Not found', message: err.message, stackTrace: err.stack });
    return handleResponse(res, null, err.message, false)
}

module.exports = errorHandle;