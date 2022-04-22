const express = require('express');
const userRouter = express.Router();

// registration handle
userRouter.post('/register', require('../controllers/user/registerUser.js'));

// login handle
  // authenticate
userRouter.post('/login', require('../controllers/user/loginAuthentication.js'));
  // get user data
userRouter.get('/me', require('../controllers/user/getUserData.js'));

// verification handle
  // get verification code
userRouter.post('/verification/:email', require('../controllers/user/sendVerificationCode.js'));
  // verify email with code
userRouter.put('/verification/:code', require('../controllers/user/verifyEmail.js'));

// changing password handle
userRouter.put('/password', require('../controllers/user/changePassword.js'));

// changing name handle
userRouter.put('/name/:name', require('../controllers/user/changeName.js'));

// delete account handle
userRouter.delete('/delete/:id', require('../controllers/user/deleteUser.js'));

module.exports = userRouter;