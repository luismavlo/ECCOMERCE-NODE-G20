const { Router } = require('express');
const { check } = require('express-validator');
const { addProductToCart } = require('../controllers/cart.controller');
const { validExistCart } = require('../middlewares/cart.middleware');
const {
  validBodyProductById,
  validIfExistProductsInStock,
} = require('../middlewares/products.middlewares');
const { validateFields } = require('../middlewares/validateField.middleware');

const router = Router();

router.post(
  '/add-product',
  [
    check('productId', 'The producId is required').not().isEmpty(),
    check('productId', 'The producId must be a number').isNumeric(),
    check('quantity', 'The quantity is required').not().isEmpty(),
    check('quantity', 'The quantity must be a number').isNumeric(),
    validateFields,
    validBodyProductById,
    validIfExistProductsInStock,
    validExistCart,
  ],
  addProductToCart
);

module.exports = {
  cartRouter: router,
};
