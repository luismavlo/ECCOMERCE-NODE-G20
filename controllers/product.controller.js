const Product = require('../models/product.model');

exports.findProducts = async (req, res) => {
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
};

exports.findProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findOne({
    where: {
      id,
      status: true,
    },
  });

  if (!product) {
    return res.status(404).json({
      status: 'error',
      message: 'The product was not found',
    });
  }

  return res.status(200).json({
    status: 'success',
    message: 'The product was found successfully',
    product,
  });
};

exports.createProduct = async (req, res) => {
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
};

exports.updateProduct = async (req, res) => {
  //1. OBTENGO MI ID DE LA REQ.PARAMS
  const { id } = req.params;
  //2. OBTENER LA INFORMACION A ACTUALIZAR DE LA REQ.BODY
  const { title, description, quantity, price } = req.body;
  //3. BUSCAR EL PRODUCTO A ACTUALIZAR
  const product = await Product.findOne({
    where: {
      id,
      status: true,
    },
  });
  //4. SI NO EXISTE EL PRODUCTO ENVIAMOS UN ERROR
  if (!product) {
    return res.status(404).json({
      status: 'error',
      message: 'The product was not found',
    });
  }
  //5. SI TODO SALIO BIEN, ACTUALIZAMOS EL PRODUCTO ENCONTRADO
  const updatedProduct = await product.update({
    title,
    description,
    quantity,
    price,
  });
  //6. ENVIO LA RESPUESTA AL CLIENTE
  res.status(200).json({
    status: 'success',
    message: 'Then product has been updated successfully',
    updatedProduct,
  });
};

exports.deleteProduct = async (req, res) => {
  //1. OBTENGO EL ID DE LA REQ.PARAMS
  const { id } = req.params;
  //2. BUSCAR EL PRODUCTO A ELIMINAR
  const product = await Product.findOne({
    where: {
      id,
      status: true,
    },
  });

  //3. ENVIAR UN ERROR SI EL PRODUCTO NO SE ENCUENTRA
  if (!product) {
    return res.status(404).json({
      status: 'error',
      message: 'The product was not found',
    });
  }
  //4. ACTUALIZAR EL ESTADO DEL PRODUCTO A FALSE
  await product.update({ status: false });
  //await product.destroy();

  //5. ENVIAR LA RESPUESTA AL CLIENTE

  res.status(200).json({
    status: 'success',
    message: 'The product has been deleted successfully',
  });
};
