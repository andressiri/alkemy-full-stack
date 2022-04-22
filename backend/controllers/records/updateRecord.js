// @description  Handle update record
// @route  PUT /api/v1/records/:id
// @access  Private
const asyncHandler = require('express-async-handler');

module.exports = asyncHandler(async (req, res) => {
  res.json({message: `Updated record ${req.params.id}`});
})