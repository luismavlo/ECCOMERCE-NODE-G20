const { promisify } = require('util');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.protect = catchAsync(async (req, res, next) => {
  //1. Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('Your are not logged in! Please log in to get access.', 401)
    );
  }

  //2. Verification token
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.SECRET_JWT_SEED
  );

  //3. Check if user still exists
  const user = await User.findOne({
    where: {
      id: decoded.id,
      status: true,
    },
  });

  if (!user) {
    return next(
      new AppError('The owner of this token is not longer available', 401)
    );
  }

  //4. Check if user changed password afther the token was issued
  const changedTimeStamp = parseInt(
    user.passwordChangedAt.getTime() / 1000,
    10
  );

  if (decoded.iat < changedTimeStamp) {
    return next(
      new AppError('User recently changed password!, please login again.', 401)
    );
  }

  req.sessionUser = user;
  next();
});
