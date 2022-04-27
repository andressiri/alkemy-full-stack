// @description  Handle delete record
// @route  DELETE /api/v1/records/:uuid
// @access  Private
const asyncHandler = require('express-async-handler');

module.exports = asyncHandler(async (req, res) => {
  res.json({message: `Deleted record ${req.params.uuid}`});
})