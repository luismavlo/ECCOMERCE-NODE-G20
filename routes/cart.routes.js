const { Router } = require('express');
const { check } = require('express-validator');
const {
  addProductToCart,
  updateCart,
  removeProductToCart,
  buyProductOnCart,
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
const {
  addProductToCartValidation,
  updateProductToCartValidation,
} = require('../middlewares/validations.middleware');

const router = Router();

router.use(protect);

router.post(
  '/add-product',
  [
    addProductToCartValidation,
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
    updateProductToCartValidation,
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

router.post('/purchase', buyProductOnCart);

module.exports = {
  cartRouter: router,
};
