import React, { useState } from "react";
import {
  Route,
  Routes,
  Link,
  NavLink,
  BrowserRouter,
  Navigate,
} from "react-router-dom";

import "./App.css";
import { Container, Navbar, Nav } from "react-bootstrap";
import FreeComponent from "./components/FreeComponent";
import AuthComponent from "./components/AuthComponent";
import Login from "./components/Login";
import Register from "./components/Register";
import Navegacion from "./components/Navegacion";
import { RutaProtegida } from "./components/RutaProtegida";

const usuInicio = {
  username: "",
  email: "",
  token: ""
};

function App() {
  const [user, setUser] = useState(usuInicio);

  function registrarUsu(usu) {
    setUser(usu);
    console.log(usu)
  }

  const logout = (e) => {
    setUser(usuInicio);
  };

  return (
    <Container>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Navegacion
              user={user.username}
              logout={logout}
            />
          }
        />
        <Route
          exact
          path="/login"
          element={<Login registrarUsu={registrarUsu} />}
        />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/free" element= {<FreeComponent />} />
        <Route element= {<RutaProtegida user={user.username} redirecTo="/" />}>
            <Route exact path="/auth" element= { <AuthComponent />} />
        </Route>  
        
      </Routes>
    </Container>
  );
}

export default App;
