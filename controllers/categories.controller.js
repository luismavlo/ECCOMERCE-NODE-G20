const Category = require('../models/category.model');
const Product = require('../models/product.model');
const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');

/* Creating a category. */
exports.createCategory = catchAsync(async (req, res, next) => {
  const { name } = req.body;

  const category = await Category.create({ name });

  res.status(201).json({
    status: 'success',
    message: 'Category created successfully',
    category,
  });
});

/* Fetching all the categories and their products. */
exports.findCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.findAll({
    attributes: ['id', 'name'],
    where: {
      status: true,
    },
    include: [
      {
        model: Product,
        attributes: { exclude: ['createdAt', 'updatedAt', 'status'] },
        where: {
          status: true,
        },
        //required: false, PARA QUE ME TRAIGA TODOS LAS CATEGORIAS SIN IMPORTAR QUE NO HALLAN PRODUCTOS
      },
    ],
  });

  res.status(200).json({
    status: 'success',
    message: 'Categories fetched successfully',
    categories,
  });
});

/* This is a middleware function that is used to fetch a category by its id. */
exports.findCategory = catchAsync(async (req, res, next) => {
  const { category } = req;

  res.status(200).json({
    status: 'success',
    message: 'Category fetched successfully',
    category,
  });
});

/* This is a middleware function that is used to fetch a category by its id. */
exports.updateCategory = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  const { category } = req;

  await category.update({ name });

  res.status(200).json({
    status: 'success',
    message: 'Category updated successfully',
  });
});

/* Deleting the category. */
exports.deleteCategory = catchAsync(async (req, res, next) => {
  const { category } = req;

  await category.update({ status: false });

  res.status(200).json({
    status: 'success',
    message: 'Category deleted successfully',
  });
});
