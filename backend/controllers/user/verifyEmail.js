// @description  Email verification with code sent
// @route  PUT /api/v1/user/verification/:code
// @access  Public
const asyncHandler = require('express-async-handler');
const requestTimeLimiter = require('../../functions/requestTimeLimiter.js');
const User = require('../../models/User.js');
const generateToken = require('../../functions/generateToken.js');

module.exports = asyncHandler(async (req, res) => {
  const code = req.params.code;
  const email = req.session.emailToVerify;

  if (!code) {
    res.status(400);
    throw new Error('Please provide the code sent to your email');
  };

  if (!req.session.code || !email) {
    res.status(428);
    throw new Error('No code was required before');
  };

  // check at least 5 seconds have passed from last code check
  requestTimeLimiter(req, res, 'codeCheckTimestamp', 5000);

  if (code !== req.session.code) {
    res.status(401)
    throw new Error('Code doesn\'t match');
  }; 

  const updateResult = await User.update(
    {
      verified: true
    },
    {
      where: {email: email},
      returning: true,
      raw: true
    }
  );

  const user_uuid = updateResult[1].user_uuid;

  res.status(200).json({
    message: 'Code is correct, email verified',
    token: generateToken(user_uuid)
  });
})