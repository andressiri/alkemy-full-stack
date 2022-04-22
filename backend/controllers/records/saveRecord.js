// @description  Handle save record
// @route  POST /api/v1/records
// @access  Private
const asyncHandler = require('express-async-handler');

module.exports = asyncHandler(async (req, res) => {
  if (!req.body.record) {
    res.status(400)
    throw new Error('Please send all the information required');
  };
  res.status(201).json({message: 'Record saved'});
})