// @description  Handle change name
// @route  PUT /api/v1/user/name/:name
// @access  Private
const asyncHandler = require('express-async-handler');

module.exports = asyncHandler(async (req, res) => {
  const {name} = req.params;

  if (!name) {
    res.status(400);
    throw new Error('Please send a new name');
  };

  const nameUpdate = await Record.update({
      name: name
    },
    {
      where: {user_uuid: req.user.user_uuid}
    }
  );
  res.status(200).json({message: `Name changed to ${name}`});
})