import express from 'express';
import * as userController from '../controllers/user-controller.js';
import * as invalidErrorController from "../controllers/invalidError-controller.js";
import app from '../App.js';

const router = express.Router();

app.use('/v1/user', userController.verifyUser);
router.post('/v1/user',userController.createUser);
router.post('*',invalidErrorController.errorURL);
  
export default router;
