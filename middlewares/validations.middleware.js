const { check } = require('express-validator');

exports.createProductValidation = [
  check('title', 'The title is required').not().isEmpty(),
  check('description', 'The description is required').not().isEmpty(),
  check('quantity', 'The quantity is required').not().isEmpty(),
  check('quantity', 'The quantity must be a number').isNumeric(),
  check('price', 'The price is required').not().isEmpty(),
  check('price', 'The price must be a number').isNumeric(),
  check('categoryId', 'The categoryId is required').not().isEmpty(),
  check('categoryId', 'The categoryId must be a number').isNumeric(),
  check('userId', 'The userId is required').not().isEmpty(),
  check('userId', 'The userId must be a number').isNumeric(),
];

exports.updateProductValidation = [
  check('title', 'The title is required').not().isEmpty(),
  check('description', 'The description is required').not().isEmpty(),
  check('quantity', 'The quantity is required').not().isEmpty(),
  check('quantity', 'The quantity must be a number').isNumeric(),
  check('price', 'The price is required').not().isEmpty(),
  check('price', 'The price must be a number').isNumeric(),
];

exports.updateUserValidation = [
  check('username', 'The username must be mandatory').not().isEmpty(),
  check('email', 'The email must be mandatory').not().isEmpty(),
  check('email', 'The email must be a correct format').isEmail(),
];

exports.updatePasswordUserValidation = [
  check('currentPassword', 'The current password must be mandatory')
    .not()
    .isEmpty(),
  check('newPassword', 'The new password must be mandatory').not().isEmpty(),
];

exports.addProductToCartValidation = [
  check('productId', 'The producId is required').not().isEmpty(),
  check('productId', 'The producId must be a number').isNumeric(),
  check('quantity', 'The quantity is required').not().isEmpty(),
  check('quantity', 'The quantity must be a number').isNumeric(),
];

exports.updateProductToCartValidation = [
  check('productId', 'The producId is required').not().isEmpty(),
  check('productId', 'The producId must be a number').isNumeric(),
  check('newQty', 'The quantity is required').not().isEmpty(),
  check('newQty', 'The quantity must be a number').isNumeric(),
];

exports.registerUserValidation = [
  check('username', 'The username must be mandatory').not().isEmpty(),
  check('email', 'The email must be mandatory').not().isEmpty(),
  check('email', 'The email must be a correct format').isEmail(),
  check('password', 'The password must be mandatory').not().isEmpty(),
];

exports.loginUserValidation = [
  check('email', 'The email must be mandatory').not().isEmpty(),
  check('email', 'The email must be a correct format').isEmail(),
  check('password', 'The password must be mandatory').not().isEmpty(),
];
