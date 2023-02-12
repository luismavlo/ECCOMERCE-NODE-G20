const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const hpp = require('hpp');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');

const { authRouter } = require('../routes/auth.routes');
const { cartRouter } = require('../routes/cart.routes');
const { categoriesRouter } = require('../routes/categories.routes');
const { db } = require('../database/db');
const { productRouter } = require('../routes/product.routes');
const { usersRouter } = require('../routes/user.routes');
const AppError = require('../utils/appError');
const globalErrorHandler = require('../controllers/error.controller');
const initModel = require('./init.model');

//1. CREAMOS UNA CLASE

class Server {
  constructor() {
    //DEFINIMOS LA APLICACIÓN DE EXPRESS Y SE LA ASIGNAMOS A LA PROPIEDAD APP
    this.app = express();
    //DEFINIMOS EL PUERTO QUE LO TENEMOS EN LOS ENVIROMENTS
    this.port = process.env.PORT || 3000;
    this.limiter = rateLimit({
      max: 100,
      windowMs: 60 * 60 * 1000,
      message: 'Too many request from this IP, please try again in an hour!',
    });
    //DEFINIMOS LOS PATHS DE NUESTRA APLICACIÓN
    this.paths = {
      auth: '/api/v1/auth',
      cart: '/api/v1/cart',
      categories: '/api/v1/categories',
      products: '/api/v1/products',
      user: '/api/v1/user',
    };

    //LLAMO EL METODO DE CONEXION A LA BASE DE DATOS
    this.database();

    //INVOCAMOS EL METODO MIDDLEWARES
    this.middlewares();

    //INVOCAMOS EL METODO ROUTES
    this.routes();
  }

  //MIDDLEWARES
  middlewares() {
    this.app.use(helmet());

    this.app.use(xss());

    this.app.use(hpp());

    if (process.env.NODE_ENV === 'development') {
      this.app.use(morgan('dev'));
    }
    this.app.use('/api/v1', this.limiter);
    //UTILIZAMOS LAS CORS PARA PERMITIR ACCESSO A LA API
    this.app.use(cors());
    //UTILIZAMOS EXPRESS.JSON PARA PARSEAR EL BODY DE LA REQUEST
    this.app.use(express.json());
  }

  //RUTAS
  routes() {
    //utilizar las rutas de autenticacion
    this.app.use(this.paths.auth, authRouter);
    //utilizar las rutas de cart
    this.app.use(this.paths.cart, cartRouter);
    //utilizar las rutas de categorias
    this.app.use(this.paths.categories, categoriesRouter);
    //utilizar las rutas de productos
    this.app.use(this.paths.products, productRouter);
    //utilizar las rutas de usuarios
    this.app.use(this.paths.user, usersRouter);

    this.app.all('*', (req, res, next) => {
      return next(
        new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
      );
    });

    this.app.use(globalErrorHandler);
  }

  database() {
    db.authenticate()
      .then(() => console.log('Database authenticated'))
      .catch(error => console.log(error));

    // relations
    initModel();

    db.sync()
      .then(() => console.log('Database synced'))
      .catch(error => console.log(error));
  }

  //METODO PARA ESCUCHAR SOLICITUDES POR EL PUERTO
  listen() {
    this.app.listen(this.port, () => {
      console.log('Server is running on port', this.port);
    });
  }
}

//2. EXPORTAMOS EL SERVIDOR
module.exports = Server;
