const { Router } = require('express');
const {
  findUserById,
  createUser,
  updateUser,
  deleteUser,
  findUsers,
} = require('../controllers/users.controllers');

const router = Router();

router.get('/', findUsers);

router.get('/:id', findUserById);

router.post('/', createUser);

router.patch('/:id', updateUser);

router.delete('/:id', deleteUser);

module.exports = {
  usersRouter: router,
};
