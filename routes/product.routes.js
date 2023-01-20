const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'ROUTE - GET',
  });
});

router.post('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'ROUTE - POST DESDE LA RUTA',
  });
});

router.patch('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'ROUTE - PATCH',
  });
});

router.put('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'ROUTE - PUT',
  });
});

router.delete('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'ROUTE - DELETE',
  });
});

module.exports = {
  productRouter: router,
};
