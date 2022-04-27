// @description  Send email verification code
// @route  POST /api/v1/user/forgot-password
// @access  Public
const asyncHandler = require('express-async-handler');
const validateEmail = require('../../functions/validateEmail.js');
const User = require('../../models/User.js');
const requestTimeLimiter = require('../../functions/requestTimeLimiter.js');
const generateCode = require('../../functions/generateCode.js');
const getMailTemplate = require('../../templates/verificationCodeMailTemplate.js');
const mailer = require('../../config/mailer.js');
require('dotenv').config();

module.exports = asyncHandler(async (req, res) => {
  const email = req.body.email;
  
  if (!email || !validateEmail(email)) {
    res.status(400);
    throw new Error('Please send a valid email');
  }

  const userName = await User.findOne({
    raw: true, 
    attributes: ['name'],
    where: {email: email}
  });

  if (!userName) {
    res.status(404);
    throw new Error('No user registered with that email');
  };

  const name = userName.name;

  // check at least 10 seconds have passed from last mail sent
  requestTimeLimiter(req, res, 'forgotPasswordCodeTimestamp', 10000);

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