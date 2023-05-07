import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import SpinnerBasico from "./SpinnerCircular";

function Login({ registrarUsu }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(" ");
  const [envio, setEnvio] = useState(false);
  const [login, setLogin] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnvio(true);
    // set configurations
    const configuration = {
      method: "POST",
      url: "https://auth-mern-backend.onrender.com/login",
      data: {
        username,
        email,
        password
      },
    };
    axios(configuration)
      .then((result) => {
        setLogin(true);
        const resUser = {
          username: result.data.username,
          email: result.data.email,
          token: result.data.token
        };
        registrarUsu(resUser);
      })
      .catch((error) => new Error());
  };
  return (
    <Container className="form-container">
       <div>{login && <Navigate to="/" />}</div> 

      <h2 className="text-center">Login</h2>
      <Form onSubmit={(e) => handleSubmit(e)}>
        {/* username */}
        <Form.Group className="mb-3" controlId="formBasicUserName">
          <Form.Label>Usuario</Form.Label>
          <Form.Control
            type="string"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        {/* email */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Correo electronico</Form.Label>
          <Form.Control
            type="string"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        {/* password */}
        <Form.Group className="mb-3" controlId="formBasicPassword">
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
          className="mb-3"
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Enviar
        </Button>
        <div className="spin-de-espera">{envio && <SpinnerBasico />}</div>
        <section className="navegacion-login">
          <Link className="btn btn-success" to="/">
            Inicio
          </Link>
          <Link className="btn btn-success" to="/register">
            Registrar
          </Link>
        </section>
      </Form>

      {/* display success message */}
      {login ? (
        <p className="text-success text-center">
          Se inicio sesion exitosamente
        </p>
      ) :
       ( envio ?
        (<p className="text-danger text-center">No se pudo inicirr sesion</p>)
        :
        (<p className="text-dark text-center">Enviar para Iniciar sesion</p>)
      )}
    </Container>
  );
}
export default Login;
