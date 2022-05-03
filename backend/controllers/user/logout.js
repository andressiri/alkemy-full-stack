// @description  Destroy express session when user logouts or leave change password page
// @route  DELETE /api/v1/user/logout
// @access  Public
const asyncHandler = require('express-async-handler');

module.exports = asyncHandler(async (req, res) => {
  req.session.destroy();

  res.json({message: 'User logged out'});
})