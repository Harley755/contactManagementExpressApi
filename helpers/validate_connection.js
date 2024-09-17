


const validateConnection = async(req) => {
     const connection = req.app.locals.connection;

    if (!connection) {
        return handleResponse(res, null, "No database connection", false);
    }

    return connection;
}

module.exports = validateConnection;