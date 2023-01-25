const User = require('../models/user.model');

const findUsers = async (req, res) => {
  const users = await User.findAll({
    where: {
      status: true,
    },
  });

  res.json({
    status: 'success',
    message: 'Users was found successfully',
    users,
  });
};

const findUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      status: true,
      id,
    },
  });

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'User not found',
    });
  }

  res.status(200).json({
    status: 'success',
    message: 'User was found successfully',
    user,
  });
};

const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  const user = await User.create({
    username: username.toLowerCase(),
    email: email.toLowerCase(),
    password,
  });

  res.status(201).json({
    status: 'success',
    message: 'User created successfully',
    user,
  });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;

  const user = await User.findOne({
    where: {
      status: true,
      id,
    },
  });

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'User not found',
    });
  }

  await user.update({ username, email });

  res.json({
    status: 'success',
    message: 'User updated successfully',
  });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      status: true,
      id,
    },
  });

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'User not found',
    });
  }

  await user.update({ status: false });

  res.json({
    status: 'success',
    message: 'User deleted successfully',
  });
};

module.exports = {
  findUsers,
  findUser,
  createUser,
  updateUser,
  deleteUser,
};
