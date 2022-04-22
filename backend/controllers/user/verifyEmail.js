// @description  Email verification with code sent
// @route  PUT /api/v1/user/verification/:code
// @access  Private
const asyncHandler = require('express-async-handler');

module.exports = asyncHandler(async (req, res) => {
  res.json({message: 'Email verification'});
})