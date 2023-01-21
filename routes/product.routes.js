const { Router } = require('express');
const {
  findProduct,
  creteProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/product.controller');

const router = Router();

router.get('/', findProduct);

router.post('/', creteProduct);

router.patch('/', updateProduct);

router.delete('/', deleteProduct);

module.exports = {
  productRouter: router,
};
