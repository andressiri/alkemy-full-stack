// @description  Get user data
// @route  GET /api/v1/user/me
// @access  Private
const asyncHandler = require('express-async-handler');
const User = require('../../models/User.js');

module.exports = asyncHandler(async (req, res) => {

  const userData = await User.findOne({
    raw: true,
    attributes: {exclude: ['password']},
    where: {user_uuid: req.user.user_uuid}
  });

  res.json({message: 'Get user data', userData});
})