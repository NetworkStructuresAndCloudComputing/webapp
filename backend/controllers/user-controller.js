import * as userService from "../services/user-service.js";
import { setErrorResponse, setResponse } from "./response-handler.js";


export const getUser = async (request, response) => {
    try {
      const { id } = request.params;
      console.log('User ID:', id); // Add this line for debugging
      const user = await userService.searchById({ id });
  
      if (!user) {
        console.log('User not found'); // Add this line for debugging
        setErrorResponse(404, response);
        return;
      }
  
      console.log('User found:', user); // Add this line for debugging
      setResponse(user, response);
    } catch (e) {
      console.error(e);
      setErrorResponse(500, response);
    }
  };
  

export const createUser = async (request, response) => {
    try {
        const params = { ...request.body };
        const newUser = await userService.create(params);
        setResponse(newUser,response);
    } catch (error) {
        console.error(error);
        setErrorResponse('500', response);
    }
};

export const updateUser = async (request, response) => {
    try {
        const id = request.params.id;
        const params = { ...request.body };
        const updatedUser = await userService.update(params, id);
        setResponse(updatedUser,response);
    } catch (e) {
        console.error(e);
        setErrorResponse('500', response);
    }
};


