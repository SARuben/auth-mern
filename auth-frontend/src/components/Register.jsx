import React from "react";
import { useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false)
  const [envio, setEnvio] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnvio(true)
    // set configurations
    const configuration = {
      method: "post",
      url: import.meta.env.VITE_SERVER_BACKEND ,
      data: {
        username,
        email,
        password
      }
    };
    axios(configuration)
    .then((result) => {setRegister(true)})
    .catch((error) => new Error())
  };
  
  return (
    <Container className="form-container">
      <div>
        {register && (<Navigate to="/" />)}
      </div>
      <h2 className="text-center">Registro</h2>
      <Form onSubmit={(e) => handleSubmit(e)}>
        {/* username */}
        <Form.Group className="mb-4" controlId="formBasicUserName">
          <Form.Label>Usuario</Form.Label>
          <Form.Control
            type="string"
            placeholder="Ingresar usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        {/* email */}
        <Form.Group className="mb-4" controlId="formBasicEmail">
          <Form.Label>Correo electronico</Form.Label>
          <Form.Control
            type="string"
            placeholder="Ingrese email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        {/* password */}
        <Form.Group className="mb-4" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
        </Form.Group>

        {/* submit button */}
        <Button
          className="mb-4"
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Enviar
        </Button>
        <section className="navegacion-login">
        <Link className="btn btn-success" to="/">Inicio</Link>
        <Link className="btn btn-success" to="/login">Iniciar sesion</Link>

        </section>
      </Form>
      {/*mensaje de resultado de axios */}
      {register 
      ? (<p className='text-success text-center'>Se registro exitosamente</p>)
      : (envio
        ? (<p className='text-danger text-center'>Ocurrio algun error durante el registro</p>)
        :
        (<p className='text-dark text-center'>Presiona Enviar para Registrarse</p>)  
        )     
      }      
    </Container>
  );
}
export default Register;
