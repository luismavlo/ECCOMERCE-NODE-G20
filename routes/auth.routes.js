const { Router } = require('express');
const { check } = require('express-validator');
const {
  createUser,
  login,
  renewToken,
} = require('../controllers/auth.controller');
const { protect } = require('../middlewares/auth.middleware');
const { validIfExistUserEmail } = require('../middlewares/user.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');
const {
  registerUserValidation,
  loginUserValidation,
} = require('../middlewares/validations.middleware');
const { upload } = require('../utils/multer');

const router = Router();

router.post(
  '/signup',
  [
    upload.single('profileImageUrl'),
    registerUserValidation,
    validateFields,
    validIfExistUserEmail,
  ],
  createUser
);

router.post('/login', loginUserValidation, validateFields, login);

router.use(protect);

router.get('/renew', renewToken);

module.exports = {
  authRouter: router,
};
