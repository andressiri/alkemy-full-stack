// @description  Handle user registration
// @route  POST /api/v1/user/register
// @access  Public
const asyncHandler = require('express-async-handler');

module.exports = asyncHandler(async (req, res) => {
  res.json({message: 'Register'});
})