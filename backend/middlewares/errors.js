import ErrorHandler from "../utils/errorHandler.js";
export default (err, req, res,next) => {
    
    let error = {
        statuscode: err?.statuscode || 500,
        message: err?.message || "Internal server error"
    };

    //Handle invalid mongoose ID error
    if(err.name === 'CastError') {
        const message = `Resource not found. Invalid: ${err?.path}`
        error = new ErrorHandler(message, 404);

    }
    //Handle mongoose duplicate key and jwt error
    if(err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`
        error = new ErrorHandler(message, 404);

    }
    //Handle Validation Error
    if(err.name === 'ValidationError') {
        const message = Object.values(err.errors).map((value) => value.message);
        error = new ErrorHandler(message, 404);

    }
    if(process.env.NODE_ENV === "DEVELOPMENT"){
        res.status(error.statuscode).json({
            message:error.message,
            error:err,
            stack:err?.stack
        });
    }
    if(process.env.NODE_ENV === "PRODUCTION"){
        res.status(error.statuscode).json({
            message:error.message,
        });
    }
    
};
