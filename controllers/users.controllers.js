const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');

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

const createUser = catchAsync(async (req, res) => {
  const { username, email, password, role = 'user' } = req.body;

  const user = await User.create({
    username: username.toLowerCase(),
    email: email.toLowerCase(),
    password,
    role,
  });

  res.status(201).json({
    status: 'success',
    message: 'User created successfully',
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
  createUser,
  updateUser,
  deleteUser,
};
