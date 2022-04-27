// @description  Handle change name
// @route  PUT /api/v1/user/name/:name
// @access  Private
const asyncHandler = require('express-async-handler');
const User = require('../../models/User.js');

module.exports = asyncHandler(async (req, res) => {
  const {name} = req.params;

  // Unnecessary??
  //if (!name) {
  //  res.status(400);
  //  throw new Error('Please send a new name');
  //};

  await User.update({
      name: name
    },
    {
      where: {user_uuid: req.user.user_uuid}
    }
  );
  res.status(200).json({message: `Name changed to ${name}`});
})