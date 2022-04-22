// @description  Handle account delete
// @route  DELETE /api/v1/user/delete/:id
// @access  Private

module.exports = (req, res) => {
  res.json({message: 'Delete account'});
}