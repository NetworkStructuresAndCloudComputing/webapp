import * as userController from "../controllers/user-controller.js";
import express from "express";

const router = express.Router();

router.route("/user/:username").get(userController.getUser);

router.route("/user/:username").put(userController.updateUser);

export default router;