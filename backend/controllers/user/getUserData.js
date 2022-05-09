// @description  Get user data
// @route  GET /api/v1/user/me
// @access  Private
const asyncHandler = require('express-async-handler');
const User = require('../../models/User.js');
const generateToken = require('../../functions/generateToken.js');

module.exports = asyncHandler(async (req, res) => {

  let userData = await User.findOne({
    raw: true,
    attributes: {exclude: ['password']},
    where: {user_uuid: req.user.user_uuid}
  });

  userData = {
    ...userData,
    token: generateToken(userData.user_uuid)
  };

  delete userData.user_uuid;

  res.json({message: 'Get user data', userData});
})