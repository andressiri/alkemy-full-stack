// @description  Handle account delete
// @route  DELETE /api/v1/user/delete/:uuid
// @access  Private
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../models/User.js');

module.exports = asyncHandler(async (req, res) => {
  const {password} = req.body;
  let user_uuid = '';

  try {
    user_uuid = jwt.verify(req.params.uuid, process.env.JWT_SECRET).user_uuid;

    if (user_uuid !== req.user.user_uuid) {
      res.status(403);
      throw new Error('You can\'t delete that resource');
    };

    const user = await User.findOne({
      raw: true,
      attributes: ['password'],
      where: {user_uuid: user_uuid}
    });

    if (!await bcrypt.compare(password, user.password)) {
      res.status(401);
      throw new Error('Password incorrect');
    };

  } catch (error) {
      const statusCode = res.statusCode ? res.statusCode : 401;
      res.status(statusCode);
      throw new Error(error);
  };

  await User.destroy({
    where: {user_uuid: user_uuid}
  });

  res.status(200).json({message: `Deleted ${req.user.name}'s account`});
})