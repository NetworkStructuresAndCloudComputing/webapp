import User from "../models/user.js"
import bcrypt from 'bcrypt';
import { setErrorResponse } from "./response-handler.js";
import Logger  from 'node-json-logger';

import logger from '../logger.js'

const checkAuth = async (req, res, next) => {
  if (!req.get('Authorization')) {
      setErrorResponse('401', 'User is not authenticated to access the resource.', res);
      logger.warn({
        severity: "WARNING",
        message: "User is not authenticated to access the resource.",
        httpRequest: {
          method: req.method,
          status: res.statusCode,
          url: req.originalUrl,
        }
      });
      return;
  } else {
      var credentials = Buffer.from(req.get('Authorization').split(' ')[1], 'base64')
          .toString()
          .split(':');
      var username = credentials[0];
      var password = credentials[1];

      try {
          const user = await User.findAll({
              where: {
                  username,
              },
          });

          if (user.length > 0) {
              const userObject = user[0];
              let dbpassword = userObject.dataValues.password;

              bcrypt.compare(password, dbpassword, (err, result) => {
                  if (err) {
                      next(err);
                  }
                  if (result) {
                      req.username = username;
                      next();
                  } else {
                    setErrorResponse('401', 'User is not authenticated to access the resource.', res);
                    logger.warn({
                        severity: "WARNING",
                        message: "User is not authenticated to access the resource.",
                        httpRequest: {
                          method: req.method,
                          status: res.statusCode,
                          url: req.originalUrl,
                        }
                      });
                      return;
                  }
              });
          } else {
            setErrorResponse('401', 'User is not authenticated to access the resource.', res);
            logger.warn({
                severity: "WARNING",
                message: "User is not authenticated to access the resource.",
                httpRequest: {
                  method: req.method,
                  status: res.statusCode,
                  url: req.originalUrl,
                }
              });
              return;
          }
      } catch (error) {
          console.error(error);
          setErrorResponse('400', 'Bad Request', res);
          logger.warn({
            severity: "WARNING",
            message: "Bad Request.",
            httpRequest: {
              method: req.method,
              status: res.statusCode,
              url: req.originalUrl,
            }
          });
          return;
      }
  }
};

export default checkAuth;