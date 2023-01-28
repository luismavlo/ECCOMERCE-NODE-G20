const User = require('../models/user.model');

exports.validIfExistUser = async (req, res, next) => {
  try {
    // 1. OBTENER EL ID DE LOS PARAMETROS
    const { id } = req.params;
    // 2. OBTENER UN USUARIO POR SU ID Y QUE EL STATUS SEA TRUE
    const user = await User.findOne({
      where: {
        status: true,
        id,
      },
    });
    //3. SI NO EXISTE UN USUARIO ENVIAR UN ERROR
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};

exports.validIfExistUserEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (user && !user.status) {
      //TODO: lo que se deberia hacer es hacerle un update a true al estado de la cuenta
      return res.status(400).json({
        status: 'error',
        message:
          'El usuario tiene una cuenta, pero esta desactivida por favor hable con el administrador para activarla',
      });
    }

    if (user) {
      return res.status(400).json({
        status: 'error',
        message: 'The email user already exists',
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
    });
  }
};
