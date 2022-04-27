// @description  Handle user registration
// @route  POST /api/v1/user/register
// @access  Public
const asyncHandler = require('express-async-handler');
const User = require('../../models/User.js');
const validateEmail = require('../../functions/validateEmail.js');
const hashPassword = require('../../functions/hashPassword.js');
const generateToken = require('../../functions/generateToken.js');

module.exports = asyncHandler(async (req, res) => {
  const {name, email, password} = req.body;  

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please send all the information required');
  };

  if (!validateEmail(email)) {
    res.status(400);
    throw new Error('Please send a valid email');
  };

  const alreadyRegistered = await User.findOne({ where: { email: email } });
  if (alreadyRegistered !== null) {
    res.status(409);
    throw new Error('That email is already registered');
  };

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  if (user) {
    const {user_uuid, name, email} = user;
    res.status(201).json({message: 'User registered', userData: {
      name, 
      email,
      token: generateToken(user_uuid)
    }});
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  };
})