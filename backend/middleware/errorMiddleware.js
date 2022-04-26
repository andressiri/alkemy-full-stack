// overwrite express default error handle
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  
  const json = res.json.message ? res.json : {
    message: err.message,
    stack: process.env.NODE_ENV !== 'development' ? null : err.stack
  };
  
  res.json(json);

  if (process.env.NODE_ENV === 'development') console.log(json.message);
}

module.exports = {
  errorHandler
};