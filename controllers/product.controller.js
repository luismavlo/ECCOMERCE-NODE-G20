const Product = require('../models/product.model');

exports.findProducts = (req, res) => {
  res.json({
    status: 'success',
    message: 'ROUTE - GET DESDE EL CONTROLADOR',
  });
};

exports.findProduct = (req, res) => {
  res.json({
    status: 'success',
    message: 'ROUTE FIND PRODUCT BY ID',
  });
};

exports.createProduct = async (req, res) => {
  const { title, description, quantity, price, categoryId, userId } = req.body;

  const newProduct = await Product.create({
    title,
    description,
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
};

exports.updateProduct = (req, res) => {
  res.json({
    status: 'success',
    message: 'ROUTE - PATCH',
  });
};

exports.deleteProduct = (req, res) => {
  const { id } = req.params;

  res.json({
    status: 'success',
    message: 'ROUTE - DELETE',
    id,
  });
};
