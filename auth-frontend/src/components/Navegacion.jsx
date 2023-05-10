import React from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import { ArrowRight,BoxArrowInRight,BoxArrowRight } from "react-bootstrap-icons";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, Link } from "react-router-dom";


function Navegacion( {user, logout}) {
  return (
    
      <Navbar className="navbar" expand="lg" bg="dark" variant="dark">
          <Navbar.Brand id="navbrand" href="/">Autenticacion React <span >
            <h4 className="usu-conectado">{user ?`Hola ${user}`: 'Bienvenid@'}</h4></span>
          </Navbar.Brand>
          <Nav className="me-auto">
          <section id="navigation">
            
            
            {user
              ? <Button variant = "dark" id="logout-btn" onClick={(e) => logout()}>
                Cerrar Sesion <span> <BoxArrowRight /> </span>
                </Button>
              : <NavLink
                   className="navlink btn"
                   to= "/login">Login 
                   <span> <BoxArrowInRight /> </span> 
                </NavLink>
            }  
            <NavLink className="navlink btn" to="/register">Registro</NavLink>
            <NavLink className="navlink btn"  to="/free">Free</NavLink>
            <NavLink className="navlink btn"  to="/auth">Protegida</NavLink>
            </section>
          </Nav>
      </Navbar>
    
  );
}
export default Navegacion;
