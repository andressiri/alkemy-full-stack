// @description  Send email verification code
// @route  POST /api/v1/user/verification
// @access  Private
const asyncHandler = require('express-async-handler');
const requestTimeLimiter = require('../../functions/requestTimeLimiter.js');
const generateCode = require('../../functions/generateCode.js');
const getMailTemplate = require('../../templates/codeMailTemplate.js');
const mailer = require('../../config/mailer.js');
require('dotenv').config();

module.exports = asyncHandler(async (req, res) => {
  const {email, name} = req.user;

  // check at least 10 seconds have passed from last mail sent
  requestTimeLimiter(req, res, 'verificationCodeTimestamp', 10000);

  req.session.code = generateCode();

  const mailTemplate = getMailTemplate(name, req.session.code);
  const emailSuccess = await mailer.sendEmail(
    email,
    'Spends Checker id verification',
    mailTemplate
  );

  if (emailSuccess.accepted[0] === `${email}`) {
    res.status(201).json({message: 'Email sent with the code', userEmail: email});
    if (process.env.NODE_ENV === 'development') console.log(`code: ${req.session.code}`);
  } else {
    res.status(500)
    throw new Error('There was a problem sending the email, please try again');
  };
})