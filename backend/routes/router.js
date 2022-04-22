const express = require('express');
const router = express.Router();

// @/records router
router.use('/records', require('./recordsRouter.js'));

// @/records router
router.use('/user', require('./userRouter.js'));

module.exports = router;