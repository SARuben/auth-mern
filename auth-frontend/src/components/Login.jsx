import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import SpinnerBasico from "./SpinnerCircular";
import Cookies from "universal-cookie";
import FacebookLogin from "@greatsumini/react-facebook-login";
import jwtdecode from "jwt-decode";
import servicios from "../../conexiones";
const cookies = new Cookies();

function Login({ registrarUsu }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(" ");
  const [metodoLogin, setMetodoLogin] = useState("local");
  const [envio, setEnvio] = useState(false);
  const [login, setLogin] = useState(false);
  const [googleId, setGoogleId] = useState("");
  const [facebookId, setFacebookId] = useState("");

  function handleCallBackResponse(response) {
    console.log("response JWT encoded " + response.credential);
    const userObject = jwtdecode(response.credential);
    console.log(userObject);
  }
  useEffect(() => {
    servicios.forEach((element) => {
      if (element.servicio === "GOOGLE_ID") {
        setGoogleId(element.client_id);
      } else if (element.servicio === "FACEBOOK_ID") {
        setFacebookId(element.client_id);
      }
    });
  }, []);
  console.log(googleId);
  console.log(facebookId);
  if (googleId) {
    google.accounts.id.initialize({
      client_id: googleId,
      callback: handleCallBackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("g_id_onload"), {
      theme: "outline",
      type: "standard",
      size: "large",
      shape: "rectangular",
    });
  }

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
        password,
        metodoLogin,
      },
    };
    axios(configuration)
      .then((result) => {
        setLogin(true);
        const resUser = {
          username: result.data.username,
          email: result.data.email,
          token: result.data.token,
        };
        registrarUsu(resUser);
        cookies.set("TOKEN", result.data.token, {
          path: "/",
        });
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
      <div id="conexiones">
        {/* Google login */}
        <br />
        <div id="g_id_onload"></div>
        <br />
        {/*Facebook login*/}
        {facebookId && (
          <FacebookLogin
            
            appId={facebookId}
            style={{
              backgroundColor: "#4267b2",
              color: "#fff",
              fontSize: "16px",
              padding: "12px 24px",
              border: "none",
              borderRadius: "4px",
            }}
            onSuccess={(response) => {
              console.log("Login Success!", response);
            }}
            onFail={(error) => {
              console.log("Login Failed!", error);
            }}
            onProfileSuccess={(response) => {
              console.log("Get Profile Success!", response);
            }}
          />
        )}
      </div>

      {/* display success message */}
      {login ? (
        <p className="text-success text-center">
          Se inicio sesion exitosamente
        </p>
      ) : envio ? (
        <p className="text-danger text-center">No se pudo iniciar sesion</p>
      ) : (
        <p className="text-dark text-center">Enviar para Iniciar sesion</p>
      )}
    </Container>
  );
}
export default Login;
