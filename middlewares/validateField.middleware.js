const { validationResult } = require('express-validator');

//CAPTURAR LOS ERRORES QUE VENGAN DE LOS CHECK
//SI EXISTE ALGUN ERROR ENVIA LOS ERRORES
exports.validateFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};
