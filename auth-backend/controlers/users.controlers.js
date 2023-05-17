const User = require("../db/userModel");
const dbConnect = require("../db/dbConnect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const getHome = (request, response, next) => {
  response.json({ message: "Respuesta del servidor!" });
  next();
};

const userRegister = async (req,res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password,10)
    const user = new User({
      username:  req.body.username,
      email: req.body.email,
      password: hashedPassword
    });
    await user.save()
    res.status(201).json({message: 'usuario creado exitosamente'})
  }
  catch {
    res.status(500).json({message: "Se produjo algun error durante la creacion del usuario"})
  }};

  const userLogin = (req,res) => {
    User.findOne({email: req.body.email}) 
    // encontro el usuario
    .then((user) => {
       bcrypt.compare(req.body.password,user.password)
       // resultado verdadero de la comparacion
      .then((passwordCheck) => {
        if (!passwordCheck) {
          res.status(400).send("error durante la comparacion")
        };
        const token = jwt.sign(
          { 
            userId: user._id,
            userEmail: user.email
        },
        process.env.SECRET_KEY,
        { expiresIn:"24h"}
        );
        res.status(200).json(
          {
          message: "comparacion finalizada exitosamente",
          username: user.username,
          email: user.email,
          token: token
        });
      })
        // error en la comparacion 
      .catch((e) => {res.status(400).send("error en la comparacion")})
      })
    // error en la busqueda del usuario  
      .catch((error) => {
        res.status(400).send("no se encontro el usuario")
    })
  }  
  
module.exports = {getHome,userRegister,userLogin}