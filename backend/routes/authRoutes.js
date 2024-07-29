import express from 'express';
import authController from '../controllers/authController.js';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/user', authController.getUser);
router.put('/user/:id', authController.updateUser);
router.delete('/user/:id', authController.deleteUser);

export default router;
