const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');

exports.createUser = catchAsync(async (req, res) => {
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
