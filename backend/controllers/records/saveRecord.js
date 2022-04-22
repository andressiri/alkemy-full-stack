// @description  Handle save record
// @route  POST /api/v1/records
// @access  Private

module.exports = (req, res) => {
  res.status(201).json({message: 'Record saved'});
}