const Product = require('../models/product.model');
const catchAsync = require('../utils/catchAsync');

exports.findProducts = catchAsync(async (req, res) => {
  const products = await Product.findAll({
    where: {
      status: true,
    },
  });

  res.status(200).json({
    status: 'success',
    message: 'The products found were successfully',
    products,
  });
});

exports.findProduct = catchAsync(async (req, res) => {
  const { product } = req;

  return res.status(200).json({
    status: 'success',
    message: 'The product was found successfully',
    product,
  });
});

exports.createProduct = catchAsync(async (req, res) => {
  const { title, description, quantity, price, categoryId, userId } = req.body;

  const newProduct = await Product.create({
    title: title.toLowerCase(),
    description: description.toLowerCase(),
    quantity,
    price,
    categoryId,
    userId,
  });

  res.status(201).json({
    status: 'success',
    message: 'The product was created successfully',
    newProduct,
  });
});

exports.updateProduct = catchAsync(async (req, res) => {
  const { product } = req;

  const { title, description, quantity, price } = req.body;

  const updatedProduct = await product.update({
    title,
    description,
    quantity,
    price,
  });

  res.status(200).json({
    status: 'success',
    message: 'Then product has been updated successfully',
    updatedProduct,
  });
});

exports.deleteProduct = catchAsync(async (req, res) => {
  const { product } = req;

  await product.update({ status: false });

  res.status(200).json({
    status: 'success',
    message: 'The product has been deleted successfully',
  });
});
