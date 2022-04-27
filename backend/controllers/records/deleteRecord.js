// @description  Handle delete record
// @route  DELETE /api/v1/records/:uuid
// @access  Private
const asyncHandler = require('express-async-handler');
const Record = require('../../models/Record.js');

module.exports = asyncHandler(async (req, res) => {
  const record_uuid = req.params.uuid;

  const record = await Record.findOne({
    raw: true,
    where: {record_uuid: record_uuid}
  });

  if (!record) {
    res.status(404);
    throw new Error('That record does not exist');
  };

  if (record.user_uuid !== req.user.user_uuid) {
    res.status(403);
    throw new Error('You can\'t delete that resource');
  };

  const recordDelete = await Record.destroy({
    where: {record_uuid: record_uuid}
  });

  res.status(200).json({message: `Deleted record ${req.params.uuid}`});
})