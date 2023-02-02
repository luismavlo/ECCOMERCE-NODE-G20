const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');
const AppError = require('../utils/appError');
const generateJWT = require('../utils/jwt');

exports.register = catchAsync(async (req, res) => {
  const { username, email, password, role } = req.body;

  // 1. crear una instancia de la clase user

  const user = new User({ username, email, password, role });

  //2. encriptar contraseña

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  //3. guardar en la base de datos con las contraseñas encriptadas
  await user.save();

  //4. generar el jwt

  const token = await generateJWT(user.id);

  //5. enviar la respuesta

  return res.status(201).json({
    status: 'success',
    user,
    token,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1. Check if user exists && password is correct
  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 2. if everything ok, send token to client

  const token = await generateJWT(user.id);

  res.status(200).json({
    status: 'success',
    token,
    user: {
      name: user.name,
      email: user.email,
      id: user.id,
      role: user.role,
    },
  });
});
