
import { sequelize } from '../services/database-service.js';
import { setErrorResponse,setResponse } from './response-handler.js';
import Logger  from 'node-json-logger';
const logger = new Logger();

export const healthzCheck = async (req, res) => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    logger.info('Success Message');
    res.status(200).send();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    res.status(503).send();
  }
};

export const methodNotAllowed = (req, res) => {
  res.status(405).send();
};

export const badRequest = (req, res) =>{
  res.status(400).send();
};