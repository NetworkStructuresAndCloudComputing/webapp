import * as userController from "../controllers/user-controller.js";
import express from "express";

const router = express.Router();

router.route("/user/:id").get(userController.getUser);

router.route("/user/:id").put(userController.updateUser);

export default router;