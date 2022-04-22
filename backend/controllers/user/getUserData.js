// @description  Get user data
// @route  GET /api/v1/user/me
// @access  Private

module.exports = (req, res) => {
  res.json({message: 'Get user data'});
}