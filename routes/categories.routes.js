const { Router } = require('express');
const { check } = require('express-validator');
const {
  createCategory,
  findCategories,
  findCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categories.controller');
const { protect, restrictTo } = require('../middlewares/auth.middleware');
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
  ],
  updateCategory
);

router.delete('/:id', validCategoryById, restrictTo('admin'), deleteCategory);

module.exports = {
  categoriesRouter: router,
};
