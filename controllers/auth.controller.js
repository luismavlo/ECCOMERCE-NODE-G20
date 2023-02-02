const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');
const generateJWT = require('../utils/jwt');

exports.createUser = catchAsync(async (req, res) => {
  const { username, email, password, role = 'user' } = req.body;

  //1. crear una instancia de la clase user
  const user = new User({ username, email, password, role });
  //2. encriptar la contraseña
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  //3. guardar en la base de datos con las contraseñas encriptadas
  await user.save();
  //4. generar el jwt
  const token = await generateJWT(user.id);

  res.status(201).json({
    status: 'success',
    message: 'User created successfully',
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
});
