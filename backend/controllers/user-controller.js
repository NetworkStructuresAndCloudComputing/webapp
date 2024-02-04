import * as userService from "../services/user-service.js";
import { setErrorResponse, setResponse } from "./response-handler.js";

export const createUser = async (request, response) => {
    try {
        const params = { ...request.body };
        const newUser = await userService.create(params);
        setResponse(response);
    } catch (error) {
        console.error(error);
        setErrorResponse('500', response);
    }
};

export const updateUser = async (request, response) => {
    try {
        console.log('Update User Function Started');
        const id = request.params.id;
        console.log('User ID:', id);
        const params = { ...request.body };
        console.log('Request Body:', params);
        const updatedUser = await userService.update(params, id);
        console.log('Updated User:', updatedUser);
        setResponse(response);
    } catch (e) {
        console.error(e);
        setErrorResponse('500', response);
    }
};


