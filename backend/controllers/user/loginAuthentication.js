// @description  Handle login authentication
// @route  POST /api/v1/user/login
// @access  Public
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../../models/User.js');
const validateEmail = require('../../functions/validateEmail.js');
const generateToken = require('../../functions/generateToken.js');

module.exports = asyncHandler(async (req, res) => {
  const {email, password} = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Please send all the information required');
  };

  if (!validateEmail(email)) {
    res.status(400);
    throw new Error('Please send a valid email');
  };

  const user = await User.findOne({ where: { email: email } });

  if (user && (await bcrypt.compare(password, user.password))) {
    const {user_uuid, name, email, verified} = user;
    res.status(201).json({message: 'User authenticated', userData: {
      name, 
      email,
      token: generateToken(user_uuid),
      verified
    }});
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  };

})