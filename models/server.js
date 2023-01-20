const express = require("express");

//1. CREAMOS UNA CLASE

class Server {
  constructor() {
    this.app = express();
    this.port = 3000;

    this.routes();
  }

  //RUTAS
  routes() {
    this.app.get("/", (req, res) => {
      res.send("Hello World");
    });
  }

  //METODO PARA ESCUCHAR SOLICITUDES POR EL PUERTO
  listen() {
    this.app.listen(this.port, () => {
      console.log("Server is running on port", this.port);
    });
  }
}

//2. EXPORTAMOS EL SERVIDOR
module.exports = Server;
