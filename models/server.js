const express = require('express');
const { productRouter } = require('../routes/product.routes');
const cors = require('cors');
const { usersRouter } = require('../routes/user.routes');
const { db } = require('../database/db');
const morgan = require('morgan');
const { categoriesRouter } = require('../routes/categories.routes');
const globalErrorHandler = require('../controllers/error.controller');
const AppError = require('../utils/appError');
const { authRouter } = require('../routes/auth.routes');
//1. CREAMOS UNA CLASE

class Server {
  constructor() {
    //DEFINIMOS LA APLICACIÓN DE EXPRESS Y SE LA ASIGNAMOS A LA PROPIEDAD APP
    this.app = express();
    //DEFINIMOS EL PUERTO QUE LO TENEMOS EN LOS ENVIROMENTS
    this.port = process.env.PORT || 3000;

    //DEFINIMOS LOS PATHS DE NUESTRA APLICACIÓN
    this.paths = {
      user: '/api/v1/user',
      products: '/api/v1/products',
      categories: '/api/v1/categories',
      auth: '/api/v1/auth',
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
    if (process.env.NODE_ENV === 'development') {
      this.app.use(morgan('dev'));
    }

    //UTILIZAMOS LAS CORS PARA PERMITIR ACCESSO A LA API
    this.app.use(cors());
    //UTILIZAMOS EXPRESS.JSON PARA PARSEAR EL BODY DE LA REQUEST
    this.app.use(express.json());
  }

  //RUTAS
  routes() {
    //utilizar las rutas de productos
    this.app.use(this.paths.products, productRouter);
    //utilizar las rutas de usuarios
    this.app.use(this.paths.user, usersRouter);
    //utilizar las rutas de categorias
    this.app.use(this.paths.categories, categoriesRouter);

    this.app.use(this.paths.auth, authRouter);

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
