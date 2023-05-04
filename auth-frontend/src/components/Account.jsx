import React from "react";
import { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";


function Account( {userNameConectado}) {
  console.log(userNameConectado)
  return (
    <Container>
      <Navbar className="navbar d-flex" bg="dark" variant="dark">
          <Navbar.Brand id="navbrand" href="#home">Autenticacion React <span className="usu-conectado">
            <h4>{userNameConectado ?`Hola ${userNameConectado}`: 'Bienvenid@'}</h4></span>
          </Navbar.Brand>
          <Nav className="me-auto">
          <section id="navigation">
            <NavLink className="navlink btn btn-primary " to="/">Inicio</NavLink>
            <NavLink className="navlink btn btn-primary " to="/login">Login</NavLink>
            <NavLink className="navlink btn btn-primary " to="/register">Registro</NavLink>
            <NavLink className="navlink btn btn-primary"  to="/free">Free</NavLink>
            <NavLink className="navlink btn btn-primary"  to="/auth">Protegida</NavLink>
            </section>
          </Nav>
      </Navbar>
    </Container>
  );
}
export default Account;
