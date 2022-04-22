// @description  Handle get records
// @route  GET /api/v1/records
// @access  Private
const asyncHandler = require('express-async-handler');

module.exports = asyncHandler(async (req, res) => {
  res.json({message: 'Get records'});
})