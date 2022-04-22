// @description  Handle delete record
// @route  DELETE /api/records/:id
// @access  Private

module.exports = (req, res) => {
  res.json({message: `Deleted record ${req.params.id}`});
}