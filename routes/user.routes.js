const { Router } = require('express');
const { check } = require('express-validator');
const {
  updateUser,
  deleteUser,
  findUsers,
  findUser,
  resetPassword,
} = require('../controllers/users.controllers');
const {
  validIfExistUser,
  validIfExistUserEmail,
} = require('../middlewares/user.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');

const router = Router();

router.get('/', findUsers);

router.get('/:id', validIfExistUser, findUser);

router.patch(
  '/:id',
  [
    check('username', 'The username must be mandatory').not().isEmpty(),
    check('email', 'The email must be mandatory').not().isEmpty(),
    check('email', 'The email must be a correct format').isEmail(),
    validateFields,
    validIfExistUser,
  ],
  updateUser
);

router.patch(
  '/password/:id',
  [
    check('confirmPassword', 'The password is required').not().isEmpty(),
    check('newPassword', 'The new password is required').not().isEmpty(),
    validateFields,
    validIfExistUser,
  ],
  resetPassword
);

router.delete('/:id', validIfExistUser, deleteUser);

module.exports = {
  usersRouter: router,
};
