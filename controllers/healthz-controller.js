
import { sequelize } from '../services/database-service.js';
import { setErrorResponse,setResponse } from './response-handler.js';
import Logger  from 'node-json-logger';

import logger from '../logger.js'

export const healthzCheck = async (req, res) => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    logger.info({
      severity: "INFO",
      message: "Success",
      spanId: req.spanId,
      httpRequest: {
        method: req.method,
        status: req.status,
        url: req.originalUrl,
      }
    });
    res.status(200).send();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    logger.error({
      severity: "ERROR",
      message: "There was an error in the application.",
      spanId: req.spanId,
      httpRequest: {
        method: req.method,
        url: req.originalUrl,
      }
    });
    res.status(503).send();
  }
};

export const methodNotAllowed = (req, res) => {
  logger.warn({
    severity: "WARNING",
    message: "Method not allowed.",
    spanId: req.spanId,
    httpRequest: {
      method: req.method,
      status: req.status,
      url: req.originalUrl,
    }
  });
  res.status(405).send();
};

export const badRequest = (req, res) =>{
  logger.warn({
    severity: "WARNING",
    message: "Bad request.",
    spanId: req.spanId,
    httpRequest: {
      method: req.method,
      status: req.status,
      url: req.originalUrl,
    }
  });
  res.status(400).send();
};