const express = require('express');
const router = express.Router();

// @/records router
router.use('/records', require('./recordsRouter.js'));

module.exports = router;