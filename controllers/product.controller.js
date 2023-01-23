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

exports.createProduct = (req, res) => {
  const { name, price, stock } = req.body;

  res.json({
    status: 'success',
    message: 'ROUTE - POST DESDE LA RUTA',
    product: {
      name,
      price,
      stock,
    },
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
