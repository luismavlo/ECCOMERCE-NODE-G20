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
const {
  createProductValidation,
  updateProductValidation,
} = require('../middlewares/validations.middleware');
const { upload } = require('../utils/multer');

const router = Router();

router.get('/', findProducts);

router.get('/:id', validProductById, findProduct);

router.use(protect);

router.post(
  '/',
  upload.array('productImgs', 3),
  createProductValidation,
  validateFields,
  restrictTo('admin'),
  createProduct
);

router.patch(
  '/:id',
  updateProductValidation,
  validateFields,
  validProductById,
  restrictTo('admin'),
  updateProduct
);

router.delete('/:id', validProductById, restrictTo('admin'), deleteProduct);

module.exports = {
  productRouter: router,
};
