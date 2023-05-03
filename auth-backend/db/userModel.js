const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  username: {
    type: String
  },
  email: {
    type:String,
    required: [true, 'Por favor ingrese un email'],
    unique: [true,'El correo ingresado ya existe']
  },
  password: {
    type: String,
    required: [true, 'Por favor ingrese una contraseña'],
    unique: false

  }
});
module.exports = model ('User',UserSchema); 
