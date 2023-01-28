const Product = require('../models/product.model');

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
      return res.status(404).json({
        status: 'error',
        message: 'Product not found',
      });
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
