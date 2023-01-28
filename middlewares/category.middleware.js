const Category = require('../models/category.model');

exports.validCategoryById = async (req, res, next) => {
  try {
    //1. OBTENER LA INFORMACION DE LA REQ.PARAMS
    //O EN SU DEFECTO POR DONDE SE ENVIE
    const { id } = req.params;

    //2. BUSCAR EL REGISTRO A VALIDAD, EN ESTE CASO
    //LA CATEGORIA
    const category = await Category.findOne({
      where: {
        id,
        status: true,
      },
    });

    //3. VALIDAR SI EL REGISTRO ENCONTRADO, EN ESTE CASO CATEGORIA EXISTA, SI NO, ENVIAR UN ERROR

    if (!category) {
      return res.status(404).json({
        status: 'error',
        message: 'Category not found',
      });
    }

    //4.
    req.category = category;
    next();
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};
