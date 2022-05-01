// @description  Handle get records
// @route  GET /api/v1/records
// @access  Private
const asyncHandler = require('express-async-handler');
const Record = require('../../models/Record.js');

module.exports = asyncHandler(async (req, res) => {
  let message = 'Records obtained';

  const records = await Record.findAll({
    raw: true,
    where: {user_uuid: req.user.user_uuid},
    attributes: {exclude: ['user_uuid']}
  });

  if (!records[0]) message = `No records saved by ${req.user.name}`;
  
  res.status(200).json({message, records});
})