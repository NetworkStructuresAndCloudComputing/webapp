import * as userController from "../controllers/user-controller.js";
import checkAuth from "../controllers/check-auth-controller.js";
import * as invalidErrorController from "../controllers/invalidError-controller.js";
import express from "express";

const router = express.Router();

router.use("/user/self", checkAuth);

router.route("/user/self")
  .get(userController.getUser)
  .put(userController.updateUser);

router.all("*",
  invalidErrorController.errorURL);

export default router;
