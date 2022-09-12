import express from 'express';
import {
  showUsers,
  showUserById,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/user.js';

//init express router
const router = express.Router();

router.get('/users', showUsers);
router.get('/users/:id', showUserById);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;