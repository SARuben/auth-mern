import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import SpinnerBasico from "./SpinnerCircular";
import Cookies from "universal-cookie";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { Facebook } from "react-bootstrap-icons";
import { GoogleLogin } from 'react-social-signin';
import jwt_decode from "jwt-decode";

const cookies = new Cookies();

function Login({ registrarUsu }) {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [metodoLogin, setMetodoLogin] = useState("local");
  const [envio, setEnvio] = useState(false);
  const [flaglogin, setFlaglogin] = useState(false)

  const handleLogin = (name, mail, token) => {
    const usuLogin = {
      username: name,
      email: mail,
      token: token,
    };
    
    registrarUsu(usuLogin);
    cookies.set("TOKEN", token, {
      path: "/",
    });
    setFlaglogin(true);
  };

  const responseFacebook = (response) => {
    handleLogin(response.name, response.email, response.accesToken);{
    }
  };

  const googleCallback = (response) => {
    console.log(response.credential);
    const googleobj = jwt_decode(response.credential)
    handleLogin(googleobj.name,googleobj.email,response.credential)
    console.log(googleobj.sub)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnvio(true);
    // set configurations
    const configuration = {
      method: "POST",
      url:import.meta.env.VITE_SERVER_BACKEND,
      data: {
        email,
        password,
        metodoLogin,
      },
    };

    axios(configuration)
      .then((result) => {
        setFlaglogin(true);
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
      <div>{flaglogin && <Navigate to="/" />}</div>

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
        <section id="botones">
        <Button
          className="mb-3"
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >Enviar
        </Button>
        <Link className="btn btn-success" to="/">Inicio</Link>
          <Link className="btn btn-success" to="/register">Registrar</Link>
          </section>
      </Form>
      <div className="spin-de-espera">{envio && <SpinnerBasico />}</div>
      <section id="loginbtns">  
      {/* Google login */}
      <br />
      { import.meta.env.VITE_GOOGLE_CLIENT_ID && 
      ( <div id="login_google_btn">
      <GoogleLogin
          
          clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID} 
          callback={googleCallback} 
          promptEnable ={true}
          buttonTheme={{theme: 'outile', size:'large'}}
       />
       </div>
       )
      }
      <br />
      {/*Facebook login*/}
      {import.meta.env.VITE_FACEBOOK_CLIENT_ID && (
        <FacebookLogin
          appId={import.meta.env.VITE_FACEBOOK_CLIENT_ID}
          autoLoad={false}
          fields="name,email,picture"
          buttonStyle= {{
            theme: 'outline', 
            text: 'acceder con Google',
            width: '800px'
          }}
          callback={responseFacebook}
          render={renderProps => (
            <button id="login-facebook-btn" onClick={renderProps.onClick}>
            <span> <Facebook size={25}/> </span> Acceder con Facebook</button>
          )}
        />
      )}
      </section>
      {/* display success message */}
      {flaglogin ? (
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
