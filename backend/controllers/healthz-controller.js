
import { sequelize } from '../services/database-service.js';
import { setErrorResponse,setResponse } from './response-handler.js';

export const healthzCheck = async (req, res) => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    setResponse(res);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    setErrorResponse('503',res);
  }
};

export const methodNotAllowed = (req, res) => {
  setErrorResponse('405',res);
};

export const badRequest = (req, res) =>{
  setErrorResponse('400', res);
};