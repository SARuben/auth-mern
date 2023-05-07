const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const dbConnect = require("./db/dbConnect");
const User = require("./db/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors")
const auth = require("./auth");

// body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())



app.get("/", (request, response, next) => {
  response.json({ message: "Respuesta del servidor!" });
  next();
});

app.post("/register", async (req,res) => {
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
  }
  });  
  

app.post('/login',(req,res) => {
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
        "RANDOM-TOKEN",
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
  });

// free endpoint
app.get("/free-endpoint", (request, response) => {
  response.status(200).json({ message: "Acceso Libre en todo momento" });
});

// authentication endpoint
app.get("/auth-endpoint",auth,(req, res) => {
  res.status(200).json({ message: "Estas autorizado a acceder a esta url" });
});


// midlleware de control de origen cruzado
// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});


dbConnect()
module.exports = app;
