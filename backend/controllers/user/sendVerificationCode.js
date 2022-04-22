// @description  Send email verification code
// @route  POST /api/v1/user/verification/:email
// @access  Private
const asyncHandler = require('express-async-handler');

module.exports = asyncHandler(async (req, res) => {
  res.json({message: 'Send verification code'});
})