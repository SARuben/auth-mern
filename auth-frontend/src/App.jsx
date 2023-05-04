import React, { useState } from "react";
import { Route, Routes, Link, BrowserRouter, Navigate } from "react-router-dom"; 
import "./App.css";
import Account from "./components/Account";
import FreeComponent from "./components/FreeComponent";
import AuthComponent from "./components/AuthComponent";
import Login from "./components/Login";
import Register from "./components/Register";

const usuInicio = {
  username: '',
  email: '',
  token: ''
};

function App() {
  const [usuConectado, setUsuConectado] = useState(usuInicio); 

  function registrarUsu(usu) {
    setUsuConectado(usu)
    
  }

  return (
    
    <Routes> 
       <Route exact path= "/" element={<Account userNameConectado = {usuConectado.username}/>} /> 
       <Route exact path= "/login" element={<Login registrarUsu = {registrarUsu}/>} /> 
       <Route exact path= "/register" element={<Register/>} /> 
       <Route exact path= "/free" element={<FreeComponent/>}/>
       <Route exact path= "/auth" element={<AuthComponent/>} />
    </Routes>
    
  );
}

export default App;
