const { Router } = require('express');
const { check } = require('express-validator');

const { register, login } = require('../controllers/auth.controller');

const router = Router();

router.post(
  '/signup',
  [
    check('username', 'The username must be mandatory').not().isEmpty(),
    check('email', 'The email must be mandatory').not().isEmpty(),
    check('email', 'The email must be a correct format').isEmail(),
    check('password', 'The password must be mandatory').not().isEmpty(),
    validateFields,
    validIfExistUserEmail,
  ],
  register
);

router.post(
  '/login',
  [
    check('username', 'The username must be mandatory').not().isEmpty(),
    check('password', 'The password must be mandatory').not().isEmpty(),
    validateFields,
  ],
  login
);

module.exports = {
  authRouter: router,
};
