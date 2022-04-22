// @description  Handle update record
// @route  PUT /api/v1/records/:id
// @access  Private

module.exports = (req, res) => {
  res.json({message: `Updated record ${req.params.id}`});
}