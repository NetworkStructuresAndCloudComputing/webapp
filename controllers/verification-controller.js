export const verifyUser = async (req, res) => {
    const {userId} = req.params
  
      try {
        const user = await userServices.searchByUserId(userId)
        console.log(user)
        const currentTime = new Date()
        if(currentTime > user.expirationTime ){
          res.status(400).json({message: "Link expired"});
        }
        else{
  
  
          user.set({...user.dataValues, isVerified: true})
  
          await user.save();
          logger.info({
            message: "User verified successfully", 
            httpRequest: {
              requestMethod: req.method,
              requestUrl: req.originalUrl,
              status: 204, 
            }
          })
          return res.status(200).json({isVerified: true});
        }
        
        
      } catch (error) {
        console.error('Error updating user:', error);
        logger.error({
          message: "Error while updating user data", 
          httpRequest: {
            requestMethod: req.method,
            requestUrl: req.originalUrl,
            status: 500, 
          }
      })
        return res.status(500).json();
      }
    
  }