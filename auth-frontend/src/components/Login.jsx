import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


function Login({registrarUsu}) {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [login, setLogin] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // set configurations
    const configuration = {
      method: "POST",
      url: "https://auth-mern-backend.onrender.com/login",
      data: {
        username,
        email,
        password,
      },
    };
    axios(configuration)
      .then((result) => {
        setLogin(true);
        const resUser = {
          username: result.data.username,
          email: result.data.email,
          token: result.data.token
        }
        console.log(resUser)
        registrarUsu(resUser)       
        // window.location.href = '/'
      })
      .catch((error) => new Error());
  };

  return (
    <Container className= "form">
      <h2 className="text-center">Login</h2>
      <Form  onSubmit={(e) => handleSubmit(e)}>
        {/* username */}
        <Form.Group className="mb-3" controlId="formBasicUserName">
          <Form.Label>Usuario</Form.Label>
          <Form.Control
            type="string"
            placeholder="Ingresar nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        {/* email */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Correo electronico</Form.Label>
          <Form.Control
            type="string"
            placeholder="Ingrese email"
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
        <section className="navegacion-login">
        <Link className="btn btn-success" to="/">Inicio</Link>
        <Link className="btn btn-success" to="/register">Registrar</Link>

        </section>
      </Form>

      {/* display success message */}
      {login ? (
        <p className="text-success text-center">Se inicio sesion exitosamente</p>
      ) : (
        <p className="text-danger text-center">No se pudo inicir sesion</p>
      )}
    </Container>
  );
}
export default Login;
