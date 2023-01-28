const { Router } = require('express');
const { check } = require('express-validator');
const {
  createUser,
  updateUser,
  deleteUser,
  findUsers,
  findUser,
} = require('../controllers/users.controllers');
const {
  validIfExistUser,
  validIfExistUserEmail,
} = require('../middlewares/user.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');

const router = Router();

router.get('/', findUsers);

router.get('/:id', validIfExistUser, findUser);

router.post(
  '/',
  [
    check('username', 'The username must be mandatory').not().isEmpty(),
    check('email', 'The email must be mandatory').not().isEmpty(),
    check('email', 'The email must be a correct format').isEmail(),
    check('password', 'The password must be mandatory').not().isEmpty(),
    validateFields,
    validIfExistUserEmail,
  ],
  createUser
);

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

router.delete('/:id', validIfExistUser, deleteUser);

module.exports = {
  usersRouter: router,
};
