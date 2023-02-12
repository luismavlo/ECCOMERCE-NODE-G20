const { Router } = require('express');
const { check } = require('express-validator');
const {
  findProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  findProduct,
} = require('../controllers/product.controller');
const { protect, restrictTo } = require('../middlewares/auth.middleware');
const { validProductById } = require('../middlewares/products.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');

const router = Router();

router.get('/', findProducts);

router.get('/:id', validProductById, findProduct);

router.use(protect);

router.post(
  '/',
  [
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
    validateFields,
    restrictTo('admin'),
  ],
  createProduct
);

router.patch(
  '/:id',
  [
    check('title', 'The title is required').not().isEmpty(),
    check('description', 'The description is required').not().isEmpty(),
    check('quantity', 'The quantity is required').not().isEmpty(),
    check('quantity', 'The quantity must be a number').isNumeric(),
    check('price', 'The price is required').not().isEmpty(),
    check('price', 'The price must be a number').isNumeric(),
    validateFields,
    validProductById,
    restrictTo('admin'),
  ],
  updateProduct
);

router.delete('/:id', validProductById, restrictTo('admin'), deleteProduct);

module.exports = {
  productRouter: router,
};
