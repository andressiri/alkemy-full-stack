// @description  Handle save record
// @route  POST /api/v1/records
// @access  Private
const asyncHandler = require('express-async-handler');
const Record = require('../../models/Record.js');

module.exports = asyncHandler(async (req, res) => {
  const {concept, amount, operation_date, operation_type, category} = req.body;
  const parsedAmount = parseFloat(amount);
  const auxDate = new Date(operation_date);

  if (!concept || !amount || !operation_date || !operation_type) {
    res.status(400);
    throw new Error('Please send all the information required');
  };

  if (operation_type !== 'Income' && operation_type !== 'Outcome') {
    res.status(400);
    throw new Error('Please send a valid operation type');
  };

  if (isNaN(parsedAmount)) {
    res.status(400);
    throw new Error('Please enter a number in the amount field');
  };

  const createResult = await Record.create({
    concept,
    amount: parsedAmount,
    operation_date: auxDate,
    operation_type,
    category,
    user_uuid: req.user.user_uuid
  });

  const recordData = {
    ...createResult.dataValues,
  };
  delete recordData.user_uuid;

  res.status(201).json({message: 'Record created', recordData});
})