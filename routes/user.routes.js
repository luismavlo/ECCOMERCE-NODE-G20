const { Router } = require('express');
const {
  createUser,
  updateUser,
  deleteUser,
  findUsers,
  findUser,
} = require('../controllers/users.controllers');
const {
  validIfExistUser,
  validIfExistUserEmail,
} = require('../middlewares/user.middleware');

const router = Router();

router.get('/', findUsers);

router.get('/:id', validIfExistUser, findUser);

router.post('/', validIfExistUserEmail, createUser);

router.patch('/:id', validIfExistUser, updateUser);

router.delete('/:id', validIfExistUser, deleteUser);

module.exports = {
  usersRouter: router,
};
