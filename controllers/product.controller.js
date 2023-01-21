exports.findProduct = (req, res) => {
  console.log(req);
  res.json({
    status: 'success',
    message: 'ROUTE - GET DESDE EL CONTROLADOR',
  });
};

exports.creteProduct = (req, res) => {
  res.json({
    status: 'success',
    message: 'ROUTE - POST DESDE LA RUTA',
  });
};

exports.updateProduct = (req, res) => {
  res.json({
    status: 'success',
    message: 'ROUTE - PATCH',
  });
};

exports.deleteProduct = (req, res) => {
  res.json({
    status: 'success',
    message: 'ROUTE - DELETE',
  });
};
