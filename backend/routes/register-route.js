import express from 'express';
import * as userController from '../controllers/user-controller.js';

const router = express.Router();

router.post('/user',userController.createUser);
  
export default router;
