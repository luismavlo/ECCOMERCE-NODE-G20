const express = require('express');
const { productRouter } = require('../routes/product.routes');

//1. CREAMOS UNA CLASE

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 4000;

    this.paths = {
      user: '/api/v1/user',
      products: '/api/v1/products',
    };

    this.middlewares();

    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
  }

  //RUTAS
  routes() {
    this.app.use(this.paths.products, productRouter);
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
