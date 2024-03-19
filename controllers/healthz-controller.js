
import { sequelize } from '../services/database-service.js';
import { setErrorResponse,setResponse } from './response-handler.js';
import Logger  from 'node-json-logger';

import logger from '../logger.js'

export const healthzCheck = async (req, res) => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    res.status(200).send();
    logger.info({
      severity: "INFO",
      message: "Success",
      httpRequest: {
        method: req.method,
        status: res.statusCode,
        url: req.originalUrl,
      }
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    res.status(503).send();
    logger.error({
      severity: "ERROR",
      message: "There was an error in the application.",
      httpRequest: {
        method: req.method,
        status: res.statusCode,
        url: req.originalUrl,
      }
    });
  }
};

export const methodNotAllowed = (req, res) => {
  res.status(405).send();
  logger.warn({
    severity: "WARNING",
    message: "Method not allowed.",
    httpRequest: {
      method: req.method,
      status: res.statusCode,
      url: req.originalUrl,
    }
  });
};

export const badRequest = (req, res) =>{
  res.status(400).send();
  logger.warn({
    severity: "WARNING",
    message: "Bad request.",
    httpRequest: {
      method: req.method,
      status: res.statusCode,
      url: req.originalUrl,
    }
  });
};