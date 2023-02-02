const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');
const bcryptjs = require('bcryptjs');
const AppError = require('../utils/appError');

exports.findUsers = catchAsync(async (req, res, next) => {
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

exports.findUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  res.status(200).json({
    status: 'success',
    message: 'User was found successfully',
    user,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { username, email } = req.body;
  const { user } = req;

  await user.update({ username, email });

  res.status(200).json({
    status: 'success',
    message: 'User updated successfully',
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: false });

  res.status(200).json({
    status: 'success',
    message: 'User deleted successfully',
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { confirmPassword, newPassword } = req.body;

  if (!(await bcryptjs.compare(confirmPassword, user.password))) {
    return next(new AppError('Incorrect password', 401));
  }

  const salt = await bcryptjs.genSalt(10);
  encriptedPassword = await bcryptjs.hash(newPassword, salt);

  await user.update({
    password: encriptedPassword,
    passwordChangedAt: new Date(),
  });

  res.status(200).json({
    status: 'success',
    message: 'The user password was updated successfully',
  });
});
