// @description  Handle change password
// @route  PUT /api/v1/user/password
// @access  Private
const asyncHandler = require('express-async-handler');

module.exports = asyncHandler(async (req, res) => {
  res.json({message: 'Change password'});
})