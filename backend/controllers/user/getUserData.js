// @description  Get user data
// @route  GET /api/v1/user/me
// @access  Private
const asyncHandler = require('express-async-handler');

module.exports = asyncHandler(async (req, res) => {
  res.json({message: 'Get user data'});
})