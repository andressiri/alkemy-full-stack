// @description  Handle account delete
// @route  DELETE /api/v1/user/delete/:id
// @access  Private
const asyncHandler = require('express-async-handler');

module.exports = asyncHandler(async (req, res) => {
  res.json({message: 'Delete account'});
})