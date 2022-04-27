const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv').config();
const User = require('../models/User.js');

const protectRoute = asyncHandler(async (req, res, next) => {
  let token = '';

  console.log(req.headers);

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
          // Get token from header
      token = req.headers.authorization.split(' ')[1];

      console.log(token);

      // Verify token
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await User.findOne({ 
        attributes: {exclude: ['password']},
        where: {user_uuid: decodedToken.user_uuid} 
      });

      next();
    } catch (err) {
      res.status(401);
      throw new Error('Not authorized');
    };
  };

  if (!token) {
    res.status(401);
    throw new Error('Not authorized');
  };
})

module.exports = protectRoute;