import User from "../models/user.js"
import bcrypt from 'bcrypt';
import { setErrorResponse, setResponse } from "./response-handler.js";

const checkAuth = async (req, res, next) => {
    if (!req.get('Authorization')) {
        setErrorResponse('401', 'User is not authenticated to access the resource.', res);
        return;
    }
    else {
      var credentials = Buffer.from(req.get('Authorization').split(' ')[1], 'base64')
        .toString()
        .split(':')
      var username = credentials[0]
      var password = credentials[1]
        
      const user =  await User.findAll({
        where: {
          username,
        },
      });
      if(user.length > 0){
      const userObject = user[0];
      let dbpassword = userObject.dataValues.password;

bcrypt.compare(password, dbpassword, (err, result) => {
    if(err){
        next(err)
    }
    if(result){
        req.username = username
      next()
    }
    else{
        setErrorResponse('401', 'User is not authenticated to access the resource.', res);
        return;
    }
}) }
else{
  setErrorResponse('400', "User does not exist.", res);

} }
  }

export default checkAuth