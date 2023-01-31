const Product = require('../models/product.model');
const AppError = require('../utils/appError');

exports.validProductById = async (req, res, next) => {
  try {
    // es el id del producto que vamos a ver si existe
    const { id } = req.params;

    const product = await Product.findOne({
      where: {
        id,
        status: true,
      },
    });

    console.log(req);

    if (!product) {
      return next(new AppError('Product not found', 404));
    }

    req.product = product;
    next();
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};
