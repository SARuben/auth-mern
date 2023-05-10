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
import FreeComponent from "./components/FreeComponent";
import AuthComponent from "./components/AuthComponent";
import Login from "./components/Login";
import Register from "./components/Register";
import Navegacion from "./components/Navegacion";
import { RutaProtegida } from "./components/RutaProtegida";
const usuInicio = {
  username: "",
  email: "",
  token: "",
};

function App() {
  const [user, setUser] = useState(usuInicio);

  function registrarUsu(usu) {
    setUser(usu);
    console.log(usu);
  }

  const logout = (e) => {
    setUser(usuInicio);
  };

  return (
    <BrowserRouter>
      <Navegacion user={user.username} logout={logout} />
      <Routes>
        <Route path="/login" element={<Login registrarUsu={registrarUsu} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/free" element={<FreeComponent /> } />
        <Route path="/auth" element={
          <RutaProtegida isAllowed={!!user.username} redirectTo={"/login"}>
            <AuthComponent />    
          </RutaProtegida>
      } />
     
      </Routes>
    </BrowserRouter>
  );
} 
export default App;
