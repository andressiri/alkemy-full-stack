// @description  Handle change password
// @route  PUT /api/v1/user/password
// @access  Private
const asyncHandler = require('express-async-handler');
const hashPassword = require('../../functions/hashPassword.js');
const User = require('../../models/User.js');

module.exports = asyncHandler(async (req, res) => {
  const password = req.body.password;
  let user_uuid;

  if (!password) {
    res.status(400);
    throw new Error('Please send a new password');
  };

  if (req.user) {
    user_uuid = req.user.user_uuid
  } else {
    // Get token from header
    token = req.headers.authorization.split(' ')[1];

    // Verify token
    user_uuid = jwt.verify(token, process.env.JWT_SECRET);
  };

  const hashedPassword = await hashPassword(password);

  await User.update({
      password: hashedPassword
    },
    {
      where: {user_uuid: user_uuid}
    }
  );

  res.status(200).json({message: 'Password updated'});
})