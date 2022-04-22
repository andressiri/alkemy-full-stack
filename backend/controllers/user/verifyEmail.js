// @description  Email verification with code sent
// @route  PUT /api/v1/user/verification/:code
// @access  Private

module.exports = (req, res) => {
  res.json({message: 'Email verification'});
}