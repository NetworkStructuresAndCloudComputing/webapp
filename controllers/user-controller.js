import * as userService from "../services/user-service.js";
import { setErrorResponse, setResponse, setResponsefor201, setResponsefor204 } from "./response-handler.js";
import Logger  from 'node-json-logger';

import logger from '../logger.js'

// const logger = new Logger();



export const getUser = async (request, response) => {
  try {
    const { username } = request;
    const user = await userService.searchByEmail({ username });

    if (!user) {
      logger.warn({
        severity: "WARNING",
        message: "User not found.",
        spanId: request.spanId,
        httpRequest: {
          method: request.method,
          status: request.statusCode,
          url: request.originalUrl,
        }
      });
      setErrorResponse('404','User not found', response);
      return;
    }
    logger.info({
      severity: "INFO",
      message: "User fetched successfully",
      spanId: request.spanId,
      httpRequest: {
        method: request.method,
        status: request.statusCode,
        url: request.originalUrl,
      }
    });
    setResponse(user, response);
  } catch (e) {
    console.error(e);
    logger.warn({
      severity: "WARNING",
      message: "Bad Request.",
      spanId: req.spanId,
      httpRequest: {
        method: request.method,
        status: request.statusCode,
        url: request.originalUrl,
      }
    });
    setErrorResponse('404', "Bad Request", response);
  }
};

  export const createUser = async (request, response) => {
    try {
        const params = { ...request.body };
        const existingUser = await userService.searchByEmail({ username: params.username });
        if(existingUser) {
          logger.warn({
            severity: "WARNING",
            message: "User already exists.",
            spanId: request.spanId,
            httpRequest: {
              method: request.method,
              status: request.statusCode,
              url: request.originalUrl,
            }
          });
            setErrorResponse('400','User already exists', response);
        } else {
            const newUser = await userService.create(params);
            logger.info({
              severity: "INFO",
              message: "user created successfully",
              spanId: request.spanId,
              httpRequest: {
                method: request.method,
                status: request.statusCode,
                url: request.originalUrl,
              }
            });
            setResponsefor201(newUser, response);
        }
    } catch (error) {
        console.error(error);
        logger.warn({
          severity: "WARNING",
          message: "Invalid request, check the payload.",
          spanId: request.spanId,
          httpRequest: {
            method: request.method,
            status: request.statusCode,
            url: request.originalUrl,
          }
        });
        setErrorResponse('400','Invalid request, check the payload.', response);
    }
};


export const updateUser = async (request, response) => {
  try {
    const { username } = request;
    const params = { ...request.body };
    const updatedUser = await userService.update(params, username);
    logger.info({
      severity: "INFO",
      message: "User updated successfully",
      spanId: request.spanId,
      httpRequest: {
        method: request.method,
        status: request.statusCode,
        url: request.originalUrl,
      }
    });
    setResponsefor204(updatedUser, response);
  } catch (e) {
    console.error(e);
    logger.warn({
      severity: "WARNING",
      message: "Invalid request, check the payload.",
      spanId: request.spanId,
      httpRequest: {
        method: request.method,
        status: request.statusCode,
        url: request.originalUrl,
      }
    });
    setErrorResponse('400', 'Invalid request, check the payload', response);
  }
};


