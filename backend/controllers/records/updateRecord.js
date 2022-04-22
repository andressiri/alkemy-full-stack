// @description  Handle update record
// @route  PUT /api/records/:id
// @access  Private

module.exports = (req, res) => {
  res.json({message: `Updated record ${req.params.id}`});
}