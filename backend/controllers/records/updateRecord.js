// @description  Handle update record
// @route  PUT /api/v1/records/:uuid
// @access  Private
const asyncHandler = require('express-async-handler');
const Record = require('../../models/Record.js');

module.exports = asyncHandler(async (req, res) => {
  const record_uuid = req.params.uuid;
  const {concept, amount, operation_date, category} = req.body; // operation_type can't be updated

  if (!concept || !amount || !operation_date) {
    res.status(400);
    throw new Error('Please send all the information required');
  };

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
    throw new Error('You can\'t update that resource');
  };

  const recordUpdate = await Record.update({
      concept: concept,
      amount: amount,
      operation_date: operation_date,
      category: category
    },
    {
      where: {record_uuid: record_uuid}
    }
  );

  console.log(recordUpdate);

  res.status(200).json({message: `Updated record ${req.params.uuid}`});
})