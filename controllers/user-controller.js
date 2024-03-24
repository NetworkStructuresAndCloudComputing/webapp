import * as userService from "../services/user-service.js";
import { setErrorResponse, setResponse, setResponsefor201, setResponsefor204 } from "./response-handler.js";
import logger from '../logger.js';
import publishMessage from '../publishMessage.js';

export const getUser = async (request, response) => {
  try {
    const { username } = request;
    const user = await userService.searchByEmail({ username });

    if (!user) {
      setErrorResponse('404','User not found', response);
      logger.warn({
        severity: "WARNING",
        message: "User not found.",
        httpRequest: {
          method: request.method,
          status: response.statusCode,
          url: request.originalUrl,
        }
      });
      return;
    }
    setResponse(user, response);
    logger.info({
      severity: "INFO",
      message: "User fetched successfully",
      httpRequest: {
        method: request.method,
        status: response.statusCode,
        url: request.originalUrl,
      }
    });
  } catch (e) {
    console.error(e);
    setErrorResponse('404', "Bad Request", response);
    logger.warn({
      severity: "WARNING",
      message: "Bad Request.",
      httpRequest: {
        method: request.method,
        status: response.statusCode,
        url: request.originalUrl,
      }
    });
  }
};

  export const createUser = async (request, response) => {
    try {
        const params = { ...request.body };
        const existingUser = await userService.searchByEmail({ username: params.username });
        if(existingUser) {
            setErrorResponse('400','User already exists', response);
            logger.warn({
              severity: "WARNING",
              message: "User already exists.",
              httpRequest: {
                method: request.method,
                status: response.statusCode,
                url: request.originalUrl,
              }
            });
        } else {
            const newUser = await userService.create(params);
            const messagePayload = {
              userId: newUser.uid,
              email: newUser.username,
          };
          await publishMessage('verify_email', JSON.stringify(messagePayload)); 
            setResponsefor201(newUser, response);
            logger.info({
              severity: "INFO",
              message: "user created successfully",
              httpRequest: {
                method: request.method,
                status: response.statusCode,
                url: request.originalUrl,
              }
            });
        }
    } catch (error) {
        console.error(error);
        setErrorResponse('400','Invalid request, check the payload.', response);
        logger.warn({
          severity: "WARNING",
          message: "Invalid request, check the payload.",
          httpRequest: {
            method: request.method,
            status: response.statusCode,
            url: request.originalUrl,
          }
        });
    }
};


export const updateUser = async (request, response) => {
  try {
    const { username } = request;
    const params = { ...request.body };
    const updatedUser = await userService.update(params, username);
    setResponsefor204(updatedUser, response);
    logger.info({
      severity: "INFO",
      message: "User updated successfully",
      httpRequest: {
        method: request.method,
        status: response.statusCode,
        url: request.originalUrl,
      }
    });
  } catch (e) {
    console.error(e);
    setErrorResponse('400', 'Invalid request, check the payload', response);
    logger.warn({
      severity: "WARNING",
      message: "Invalid request, check the payload.",
      httpRequest: {
        method: request.method,
        status: response.statusCode,
        url: request.originalUrl,
      }
    });
  }
};


export const verifyUser = async (request, response, next) => {
  try {

      const { username } = request;  
      const user = await userService.searchByEmail({ username });
      if (!user || !user.verified) {
          setErrorResponse('403', 'User account not verified', response);
          return;
      }
      next();
  } catch (error) {
      console.error(error);
      setErrorResponse('500', 'Internal server error', response);
  }
};

