import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import SpinnerBasico from "./SpinnerCircular";
import Cookies from "universal-cookie";
import FacebookLogin from "@greatsumini/react-facebook-login";
import jwtdecode from "jwt-decode";
const cookies = new Cookies();


function Login({ registrarUsu }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [metodoLogin, setMetodoLogin] = useState("local");
  const [envio, setEnvio] = useState(false);
  const [login, setLogin] = useState(false);
  const [fbusername, setFbusername] = useState('')
  const [fbemail, setFbemail] = useState('')
  const [fbtoken, setFbtoken] = useState('')

  const handleLogin = (name,mail,token) => {
    const usuLogin = {
      username: name,
      email: mail,
      token: token
    }
    registrarUsu(usuLogin)
    cookies.set("TOKEN", fbtoken, {
        path: "/"
    });
  }

  function handleCallBackResponse(response) {
    const userObject = jwtdecode(response.credential); //token
    setLogin(true);
    handleLogin(userObject.given_name,userObject.email,response.credential)
  }
  useEffect(() => {
    if (import.meta.env.VITE_GOOGLE_CLIENT_ID) {
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleCallBackResponse
      });
      google.accounts.id.renderButton(document.getElementById("g_id_onload"), {
        theme: "outline",       
        size: "large"
      });
    }  
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setEnvio(true);
    // set configurations
    const configuration = {
      method: "POST",
      url: "https://auth-mern-backend.onrender.com/login",
      data: {
        email,
        password,
        metodoLogin
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
        cookies.set("TOKEN", result.data.token, {
          path: "/"
        });
      })
      .catch((error) => new Error());
  };

  console.log(fbusername)
  if (metodoLogin == 'facebook' && fbusername && fbemail && fbtoken) {
    handleLogin(fbusername,fbemail,fbtoken)
  }
  return (
    <Container className="form-container">     
      <div>{login && <Navigate to="/" />}</div>
      
      <h2 className="text-center">Login</h2>
      <Form onSubmit={(e) => handleSubmit(e)}>
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
        { import.meta.env.VITE_FACEBOOK_CLIENT_ID && (
          <FacebookLogin
            appId= {import.meta.env.VITE_FACEBOOK_CLIENT_ID}
            style={{
              backgroundColor: "#4267b2",
              color: "#fff",
              fontSize: "16px",
              padding: "12px 24px",
              border: "none",
              borderRadius: "4px",
            }}
          
            onSuccess={(response) => {
              setFbtoken(response)
            }}
            onFail={(error) => {
              console.log("Login Failed!", error);
            }}
            onProfileSuccess={(response) => {
              setMetodoLogin('facebook')
              setFbemail(response.email)
              setFbusername(response.name)
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
