const AppError = require('../utils/appError');

const handleCastError22P02 = err => {
  console.log('entra');
  message = 'Some type of data sent does not match what was expected';
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  //dejar esto arriba
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  //Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    //Programming or other unknown error: don't leak error details
  } else {
    // 1) Log Error
    console.error('ERROR 🧨', err);
    // 2) SEND GENERIC MESSAGE
    res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
    });
  }
};

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'fail';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  }

  if (process.env.NODE_ENV === 'production') {
    console.log(err.parent.code);
    let error = { ...err };
    if (error.parent.code === '22P02') error = handleCastError22P02(error);

    sendErrorProd(error, res);
  }
};

module.exports = globalErrorHandler;
