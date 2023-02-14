const { Router } = require('express');
const { check } = require('express-validator');
const {
  addProductToCart,
  updateCart,
  removeProductToCart,
} = require('../controllers/cart.controller');
const { protect } = require('../middlewares/auth.middleware');
const {
  validExistCart,
  ValidExistProductInCart,
  validExistProductInCartForUpdate,
  validExistProductInCartByParamsForUpdate,
} = require('../middlewares/cart.middleware');
const {
  validBodyProductById,
  validIfExistProductsInStock,
  validExistProductInStockForUpdate,
  validExistProductIdByParams,
} = require('../middlewares/products.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');

const router = Router();

router.use(protect);

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
    ValidExistProductInCart,
  ],
  addProductToCart
);

router.patch(
  '/update-cart',
  [
    check('productId', 'The producId is required').not().isEmpty(),
    check('productId', 'The producId must be a number').isNumeric(),
    check('newQty', 'The quantity is required').not().isEmpty(),
    check('newQty', 'The quantity must be a number').isNumeric(),
    validateFields,
    validBodyProductById,
    validExistProductInStockForUpdate,
    validExistProductInCartForUpdate,
  ],
  updateCart
);

router.delete(
  '/:productId',
  validExistProductIdByParams,
  validExistProductInCartByParamsForUpdate,
  removeProductToCart
);

module.exports = {
  cartRouter: router,
};
