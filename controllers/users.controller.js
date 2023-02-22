const User = require('../models/user.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');
const Order = require('../models/order.model');
const Cart = require('../models/cart.model');
const ProductInCart = require('../models/prodictInCart.model');
const { Op } = require('sequelize');
const { ref, getDownloadURL } = require('firebase/storage');
const { storage } = require('../utils/firebase');

/* A function that is being exported. */
exports.findUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    where: {
      status: true,
    },
  });

  const usersPromises = users.map(async user => {
    const imgRef = ref(storage, user.profileImageUrl);
    const url = await getDownloadURL(imgRef);

    user.profileImageUrl = url;

    return user;
  });

  const userResolved = await Promise.all(usersPromises);

  res.status(200).json({
    status: 'success',
    message: 'Users was found successfully',
    users: userResolved,
  });
});

/* A function that is being exported. */
exports.findUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  const imgRef = ref(storage, user.profileImageUrl);
  const url = await getDownloadURL(imgRef);

  user.profileImageUrl = url;

  res.status(200).json({
    status: 'success',
    message: 'User was found successfully',
    user,
  });
});

/* Updating the user. */
exports.updateUser = catchAsync(async (req, res, next) => {
  const { username, email } = req.body;
  const { user } = req;

  await user.update({ username, email });

  res.status(200).json({
    status: 'success',
    message: 'User updated successfully',
  });
});

/* Deleting the user. */
exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: false });

  res.status(200).json({
    status: 'success',
    message: 'User deleted successfully',
  });
});

/* A function that is being exported. */
exports.updatePassword = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { currentPassword, newPassword } = req.body;

  if (!(await bcrypt.compare(currentPassword, user.password))) {
    return next(new AppError('Incorrect password', 401));
  }

  const salt = await bcrypt.genSalt(10);
  const encriptedPassword = await bcrypt.hash(newPassword, salt);

  await user.update({
    password: encriptedPassword,
    passwordChangedAt: new Date(),
  });

  res.status(200).json({
    status: 'success',
    message: 'The user password was updated successfully',
  });
});

/* A function that is being exported. */
exports.getOrders = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const orders = await Order.findAll({
    where: {
      userId: sessionUser.id,
      status: true,
    },
    include: [
      {
        model: Cart,
        where: {
          status: 'purchased',
        },
        include: [
          {
            model: ProductInCart,
            where: {
              status: 'purchased',
            },
          },
        ],
      },
    ],
  });

  res.status(200).json({
    orders,
  });
});

/* A function that is being exported. */
exports.getOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { sessionUser } = req;
  //TODO: acordarme de hacer esta mejora o esta refactorización
  const order = await Order.findOne({
    where: {
      userId: sessionUser.id,
      id,
      status: true,
    },
    include: [
      {
        model: Cart,
        where: {
          status: 'purchased',
        },
        include: [
          {
            model: ProductInCart,
            where: {
              status: 'purchased',
            },
          },
        ],
      },
    ],
  });
  res.status(200).json({
    order,
  });
});
