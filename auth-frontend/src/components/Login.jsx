import React from "react";
import Button  from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"

function Login() {
  return (
    <>
      <h2>Login</h2>
      <Form>
        {/* username */}
        <Form.Group controlId="formBasicUserName">
          <Form.Label>Usuario</Form.Label>
          <Form.Control type="username" placeholder="Ingresar nombre de usuario" />
        </Form.Group>
        {/* email */}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Correo electronico</Form.Label>
          <Form.Control type="email" placeholder="Ingrese email" />
        </Form.Group>

        {/* password */}
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        {/* submit button */}
        <Button variant="success" type="submit">
          Enviar
        </Button>
      </Form>
    </>
  );
}
export default Login;
