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
          if (!params.hasOwnProperty('isVerified')) {
            params.isVerified = false;
        }
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

export const verifyUser = async (req, res) => {
  const {userId} = req.params

    try {
      const user = await userService.searchById(userId)
      console.log(user)
      const currentTime = new Date()
      if(currentTime > user.expirationTime ){
        res.status(400).json({message: "Link expired"});
      }
      else{
        user.set({...user.dataValues, isVerified: true})
        await user.save();
        logger.info({
          message: "User verified successfully", 
          httpRequest: {
            requestMethod: req.method,
            requestUrl: req.originalUrl,
            status: 204, 
          }
        })
        return res.status(200).json({isVerified: true});
      }
    } catch (error) {
      console.error('Error updating user:', error);
      logger.error({
        message: "Error while updating user data", 
        httpRequest: {
          requestMethod: req.method,
          requestUrl: req.originalUrl,
          status: 500, 
        }
    })
      return res.status(500).json();
    }
  
}
