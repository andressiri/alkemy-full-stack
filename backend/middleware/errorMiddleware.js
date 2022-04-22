// overwrite express default error handle
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV !== 'development' ? null : err.stack
  });
}

module.exports = {
  errorHandler
};