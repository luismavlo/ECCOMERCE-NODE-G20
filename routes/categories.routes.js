const { Router } = require('express');
const { check } = require('express-validator');
const {
  createCategory,
  findCategories,
  findCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categories.controller');
const { validCategoryById } = require('../middlewares/category.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');

const router = Router();

router.get('/', findCategories);

router.get('/:id', validCategoryById, findCategory);

router.post(
  '/',
  [check('name', 'The name is required').not().isEmpty(), validateFields],
  createCategory
);

router.patch(
  '/:id',
  [
    check('name', 'The name is required').not().isEmpty(),
    validateFields,
    validCategoryById,
  ],
  updateCategory
);

router.delete('/:id', validCategoryById, deleteCategory);

module.exports = {
  categoriesRouter: router,
};
