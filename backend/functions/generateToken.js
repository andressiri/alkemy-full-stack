const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

module.exports = user_uuid => {
  return jwt.sign({user_uuid}, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
};