const { Router } = require('express');
const { check } = require('express-validator');
const {
  createCategory,
  findCategories,
  findCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categories.controller');
const {
  protect,
  restrictTo,
  protectAccountOwner,
} = require('../middlewares/auth.middleware');
const { validCategoryById } = require('../middlewares/category.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');

const router = Router();

router.get('/', findCategories);

router.get('/:id', validCategoryById, findCategory);

router.use(protect);

router.post(
  '/',
  [
    check('name', 'The name is required').not().isEmpty(),
    validateFields,
    restrictTo('admin'),
  ],
  createCategory
);

router.patch(
  '/:id',
  [
    check('name', 'The name is required').not().isEmpty(),
    validateFields,
    validCategoryById,
    restrictTo('admin'),
    protectAccountOwner,
  ],
  updateCategory
);

router.delete(
  '/:id',
  validCategoryById,
  restrictTo('admin'),
  protectAccountOwner,
  deleteCategory
);

module.exports = {
  categoriesRouter: router,
};
