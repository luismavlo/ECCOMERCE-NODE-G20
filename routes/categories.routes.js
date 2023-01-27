const { Router } = require('express');
const {
  createCategory,
  findCategories,
  findCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categories.controller');

const router = Router();

router.get('/', findCategories);

router.get('/:id', findCategory);

router.post('/', createCategory);

router.patch('/:id', updateCategory);

router.delete('/:id', deleteCategory);

module.exports = {
  categoriesRouter: router,
};
