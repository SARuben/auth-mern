const jwt = require("jsonwebtoken"); 

module.exports = async (req, res, next) => {
  try {
    // usar el token para ver si esta autorizado
    const token = await req.headers.authorization.split(" ")[2]; 
  
    // comparar los tokens
    const decodedToken = await jwt.verify(token,"RANDOM-TOKEN");
    // capturar los detalles del usuario 
    const user = await decodedToken  
    //pasar el usuario
    req.user = user
    // abrir el camino del endpoint
    next();
    
  }  
  catch(error) {
    res.status(401).json({error: new Error("Invalid Request")})
  };
};  