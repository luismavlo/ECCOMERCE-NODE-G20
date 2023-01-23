const { Router } = require('express');
const {
  findProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  findProduct,
} = require('../controllers/product.controller');

const router = Router();

//IMPORTANTE ESTOS COMENTARIOS SON MERAMENTE EDUCATIVOS

// Esta ruta me va a encontrar todos los productos, esta ruta viene
// del archivo servidor que tiene un path product y este ruta se dirige hacia
// el controlador de productos que se llama findProduct
router.get('/', findProducts);

// Esta ruta me va a encontrar un un producto dado un id, este id se lo especifico
// por el path es decir por los parametros de la url, esta ruta viene
// del archivo servidor que tiene un path product y este ruta se dirige hacia
// el controlador de productos que se llama findProductById
router.get('/:id', findProduct);

// Esta ruta me va a crear un un producto ,esta ruta viene
// del archivo servidor que tiene un path product y este ruta se dirige hacia
// el controlador de productos que se llama createProduct
router.post('/', createProduct);

// Esta ruta me va a actualizar un un producto dado un id, este id se lo especifico
// por el path es decir por los parametros de la url, esta ruta viene
// del archivo servidor que tiene un path product y este ruta se dirige hacia
// el controlador de productos que se llama updateProduct
router.patch('/:id', updateProduct);

// Esta ruta me va a actualizar un un producto dado un id, este id se lo especifico
// por el path es decir por los parametros de la url, esta ruta viene
// del archivo servidor que tiene un path product y este ruta se dirige hacia
// el controlador de productos que se llama updateProduct

router.delete('/:id', deleteProduct);

module.exports = {
  productRouter: router,
};
