import React, { useState } from "react";
import {
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Navegacion from "./components/Navegacion";
import Mailer from "./components/Mailer";
import BasicToast from "./components/Toast";

const usuInicio = {
  username: "",
  email: "",
  token: "",
};


function App() {
  const [user, setUser] = useState(usuInicio);
  const [mostrarToast, setmostrarToast] = useState(false)
  const [tituloToast, settituloToast]   = useState('')
  const [mensajeToast, setmensajeToast] = useState('')

  function registrarUsu(usu) {
    setUser(usu);
  }

  const logout = (e) => {
    setUser(usuInicio);
  };

  const setestadoToast = (estado,titulo,mensaje) => {
    setmostrarToast(estado)
    setmensajeToast(mensaje)
    settituloToast(titulo)
  }
  const resetToast = () => {
    setmostrarToast(false)
    setmensajeToast('')
    settituloToast('')
  }

  return (
    <BrowserRouter>
      <Navegacion user={user.username} logout={logout} />
      { mostrarToast && < BasicToast titulo={tituloToast} mensaje={mensajeToast}/>
      }
      <Routes>
        <Route path="/login" element={<Login registrarUsu={registrarUsu} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mail" element={<Mailer setestadoToast = {setestadoToast}/>} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
