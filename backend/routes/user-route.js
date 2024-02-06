import * as userController from "../controllers/user-controller.js";
import basicAuth from 'express-basic-auth';
import express from "express";

const router = express.Router();

const basicAuthOptions = {
    users: { [process.env.BASIC_AUTH_USERNAME]: process.env.BASIC_AUTH_PASSWORD }, 
    challenge: true,
    unauthorizedResponse: '', 
  };

const basicAuthMiddleware = basicAuth(basicAuthOptions);

router.route("/user/:username").get(basicAuthMiddleware, userController.getUser);
router.route("/user/:username").put(basicAuthMiddleware, userController.updateUser);

export default router;