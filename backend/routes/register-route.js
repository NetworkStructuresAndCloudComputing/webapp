import express from 'express';
import * as userController from '../controllers/user-controller.js';
import * as invalidErrorController from "../controllers/invalidError-controller.js";

const router = express.Router();

router.post('/user',userController.createUser);
router.post('*',invalidErrorController.errorURL);
  
export default router;
