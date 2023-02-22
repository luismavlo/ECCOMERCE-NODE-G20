const { Router } = require('express');
const { check } = require('express-validator');
const {
  updateUser,
  deleteUser,
  findUsers,
  findUser,
  updatePassword,
  getOrders,
  getOrder,
} = require('../controllers/users.controller');
const {
  protect,
  protectAccountOwner,
} = require('../middlewares/auth.middleware');
const { validIfExistUser } = require('../middlewares/user.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');
const {
  updateUserValidation,
  updatePasswordUserValidation,
} = require('../middlewares/validations.middleware');

const router = Router();

router.get('/', findUsers);

router.get('/orders', protect, getOrders);

router.get('/orders/:id', protect, getOrder);

router.get('/:id', validIfExistUser, findUser);

router.use(protect);

router.patch(
  '/:id',
  updateUserValidation,
  validateFields,
  validIfExistUser,
  protectAccountOwner,
  updateUser
);

router.patch(
  '/password/:id',
  updatePasswordUserValidation,
  validateFields,
  validIfExistUser,
  protectAccountOwner,

  updatePassword
);

router.delete('/:id', validIfExistUser, protectAccountOwner, deleteUser);

module.exports = {
  usersRouter: router,
};
