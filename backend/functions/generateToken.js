const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

module.exports = (user_uuid, temporary) => {
  let expiration = '30d';
  if (temporary) expiration = 300;

  return jwt.sign({user_uuid}, process.env.JWT_SECRET, {
    expiresIn: expiration
  })
};