const jwt = require("jsonwebtoken"); 

// verifica que el token sea correcto y continua. es un middleware
module.exports = async (req, res, next) => {
  try {
    // usar el token para ver si esta autorizado
    const token = await req.headers.authorization.split(" ")[1]; 
  
    // comparar los tokens
    const decodedToken = await jwt.verify(token,process.env.SECRET_KEY);
    // capturar los detalles del usuario 
    const user = decodedToken  
    //pasar el usuario
    req.user = user
    // abrir el camino del endpoint
    next();
    
  }  
  catch(error) {
    res.status(401).json({error: new Error("Invalid Request")})
  };
};  