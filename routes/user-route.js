import * as userController from "../controllers/user-controller.js";
import checkAuth from "../controllers/check-auth-controller.js";
import * as invalidErrorController from "../controllers/invalidError-controller.js";
import express from "express";

const router = express.Router();

router.use("/v6/user/self", checkAuth);
router.get("/v6/user/verify_user/:userId", userController.verifyUser)

router.route("/v6/user/self")
  .get(userController.getUser)
  .put(userController.updateUser);

router.all("*",invalidErrorController.errorURL);

export default router;
