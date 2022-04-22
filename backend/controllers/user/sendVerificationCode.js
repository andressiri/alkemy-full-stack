// @description  Send email verification code
// @route  POST /api/v1/user/verification/:email
// @access  Private

module.exports = (req, res) => {
  res.json({message: 'Send verification code'});
}