import * as userController from "../controllers/user-controller.js";
import { setErrorResponse } from "../controllers/response-handler.js";
import express from "express";

const router = express.Router();

router.use((req, res, next) => {
  if (!req.get('Authorization')) {
    setErrorResponse('401','User is not authenticated to access the resource.', res);
    return;
  }
  else {
    var credentials = Buffer.from(req.get('Authorization').split(' ')[1], 'base64')
      .toString()
      .split(':')

    var username = credentials[0]
    var password = credentials[1]

    if (!(username === process.env.BASIC_AUTH_USERNAME && password === process.env.BASIC_AUTH_PASSWORD)) {  
    setErrorResponse('401','User is not authenticated to access the resource.', res);
    return;
    }
    res.status(200)
    next()
  }
});

router.route("/user/:username")
  .get(userController.getUser)
  .put(userController.updateUser);

export default router;
