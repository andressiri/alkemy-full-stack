// @description  Handle login authentication
// @route  POST /api/v1/user/login
// @access  Public
const asyncHandler = require('express-async-handler');

module.exports = asyncHandler(async (req, res) => {
  res.json({message: 'Login authentication'});
})