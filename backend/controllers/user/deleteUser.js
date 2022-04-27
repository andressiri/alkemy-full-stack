// @description  Handle account delete
// @route  DELETE /api/v1/user/delete/:uuid
// @access  Private
const asyncHandler = require('express-async-handler');
const User = require('../../models/User.js');

module.exports = asyncHandler(async (req, res) => {
  const user_uuid = req.params.uuid;

  if (user_uuid !== req.user.user_uuid) {
    res.status(403);
    throw new Error('You can\'t delete that resource');
  };

  await User.destroy({
    where: {user_uuid: user_uuid}
  });

  res.status(200).json({message: `Deleted user ${user_uuid}`});
})