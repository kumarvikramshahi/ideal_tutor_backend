exports.ThrowError = (msg, code) => {
    const error = new Error(msg);
    error.statusCode = code;
    throw error;
}

exports.CustomizeError = (error, code) => {
    const customError = new Error(error.name + ": " + error.message);
    customError.statusCode = code
    return customError
}

exports.ErrorMiddleware = (error, req, resp, next) => {
    const statusCode =
        error.name == "ValidationError" || error.name == "CastError" ? 400 : error.statusCode || 500;
    const message =
        error.name == "ValidationError" || error.name == "CastError" ? error.message : error.message || "Internal server error";
    resp.status(statusCode).json({ message: message })
}
