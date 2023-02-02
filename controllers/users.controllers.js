const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');
const bcryptjs = require('bcryptjs');
const generateJWT = require('../utils/jwt');

const findUsers = catchAsync(async (req, res) => {
  const users = await User.findAll({
    where: {
      status: true,
    },
  });

  res.status(200).json({
    status: 'success',
    message: 'Users was found successfully',
    users,
  });
});

const findUser = catchAsync(async (req, res) => {
  const { user } = req;

  res.status(200).json({
    status: 'success',
    message: 'User was found successfully',
    user,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { username, email } = req.body;
  const { user } = req;

  await user.update({ username, email });

  res.status(200).json({
    status: 'success',
    message: 'User updated successfully',
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { user } = req;

  await user.update({ status: false });

  res.status(200).json({
    status: 'success',
    message: 'User deleted successfully',
  });
});

module.exports = {
  findUsers,
  findUser,
  updateUser,
  deleteUser,
};
