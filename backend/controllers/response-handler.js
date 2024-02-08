export const setResponse = (data,response) => {
  response.header('cache-control', 'no-cache');
    response.status(200).json(data);
  };

  export const setResponsefor204 = (data,response) => {
    response.header('cache-control', 'no-cache');
    response.status(204).json(data);
  };
  

  export const setResponsefor201 = (data,response) => {
    response.header('cache-control', 'no-cache');
    response.status(201).json(data);
  };
  

  export const setErrorResponse = (errorCode, errorMessage, response) => {
    response.header('cache-control', 'no-cache');
    console.log({errorCode, errorMessage});
    
    switch (errorCode) {
      case '400': {
        response.status(400).json({
          code: "BadRequest",
          message: errorMessage ? errorMessage : "Invalid request, check the payload.",
        });
        break;
      }
      case '401': {
        response.status(401).json({
          code: "UnauthorizedRequest",
          message: errorMessage ? errorMessage : "User is not authenticated to access the resource.",
        });
        break;
      }
      case '403': {
        response.status(403).json({
          code: "Forbidden",
          message: errorMessage ? errorMessage : "Forbidden.",
        });
        break;
      }
      case '404': {
        response.status(404).json({
          code: "BadRequest",
          message: errorMessage ? errorMessage : "Not Found.",
        });
        break;
      }
      case '405': {
        response.status(405).json({
          code: "Forbidden",
          message: errorMessage ? errorMessage : "Method not allowed.",
        });
        break;
      }
      case '500': {
        response.status(500).json({
          code: "ServicesError",
          message: errorMessage ? errorMessage : "Error occured while processing your request.",
        });
        break;
      }
      default:{}
    }
  };