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

