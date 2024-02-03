export const setResponse = (response) => {
    response.status(200).send();
  };
  
  export const setErrorResponse = (errorCode,response) => {
   // console.log({errorCode, errorMessage});
    
    switch (errorCode) {
      case '400': {
        response.status(400).send();
        break;
      }
      case '401': {
        response.status(401).send();
        break;
      }
      case '403': {
        response.status(403).send();
        break;
      }
      case '405': {
        response.status(405).send();
        break;
      }
      case '500': {
        response.status(500).send();
        break;
      }
      case '503': {
        response.status(503).send();
        break;
      }
      default:{}
    }
  };