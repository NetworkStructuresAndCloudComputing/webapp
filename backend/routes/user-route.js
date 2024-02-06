import * as invalidErrorController from "../controllers/invalidError-controller.js";
import * as userController from "../controllers/user-controller.js";
import express from "express";

const router = express.Router();

router.route("/user/:username").get(userController.getUser);

router.route("/user/:id").put(userController.updateUser);

router.post('*',invalidErrorController.errorURL);

export default router;