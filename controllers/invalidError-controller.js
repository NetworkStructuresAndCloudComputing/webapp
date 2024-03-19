import Logger  from 'node-json-logger';

import logger from '../logger.js'

export const errorURL = async (req, res) => {
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
  }