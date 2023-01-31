const Product = require('../models/product.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validProductById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findOne({
    where: {
      id,
      status: true,
    },
  });

  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  req.product = product;
  next();
});
