// @description  Handle user registration
// @route  POST /api/v1/user/register
// @access  Public
const asyncHandler = require('express-async-handler');
const User = require('../../models/User.js');
const validateEmail = require('../../functions/validateEmail.js');
const hashPassword = require('../../functions/hashPassword.js');

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

  const project = await User.findOne({ where: { email: email } });
  if (project !== null) {
    res.status(409);
    throw new Error('That email is already registered');
  };

  const hashedPassword = await hashPassword(password);

  await User.create({
    name,
    email,
    password: hashedPassword
  });

  res.status(201).json({message: 'User registered'});
})