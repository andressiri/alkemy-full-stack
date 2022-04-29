const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv').config();
const User = require('../models/User.js');

const protectRoute = asyncHandler(async (req, res, next) => {
  let token = '';
  let decodedToken = '';

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

    // Get token from header
    token = req.headers.authorization.split(' ')[1];
    try {
      // Verify token
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, invalid token');
    };


    // Get user from the token
    req.user = await User.findOne({
      raw: true, 
      attributes: {exclude: ['password']},
      where: {user_uuid: decodedToken.user_uuid} 
    });

    // Check if it was a wrong token or something went wrong
    if (!req.user) {
      res.status(401);
      throw new Error('Not authorized');
    };

    next();
  };

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  };
})

module.exports = protectRoute;