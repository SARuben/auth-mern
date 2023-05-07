import React from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import { ArrowRight,BoxArrowInRight,BoxArrowRight } from "react-bootstrap-icons";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, Link } from "react-router-dom";


function Navegacion( {user, logout}) {
  return (
    
      <Navbar className="navbar d-flex" expand="lg" bg="dark" variant="dark">
          <Navbar.Brand id="navbrand" href="/">Autenticacion React <span >
            <h4 className="usu-conectado">{user ?`Hola ${user}`: 'Bienvenid@'}</h4></span>
          </Navbar.Brand>
          <Nav className="me-auto">
          <section id="navigation">
            
            <Link className="navlink btn btn-dark"  to="/">Inicio</Link>
            {user
              ? <Button variant = "dark" id="logout-btn" onClick={(e) => logout()}>
                Cerrar Sesion <span> <BoxArrowRight /> </span>
                </Button>
              : <Link
                   className="navlink btn"
                   to= "/login">Login 
                   <span> <BoxArrowInRight /> </span> 
                </Link>
            }  
            <Link className="navlink btn" to="/register">Registro</Link>
            <Link className="navlink btn"  to="/free">Free</Link>
            <Link className="navlink btn"  to="/auth">Protegida</Link>
            </section>
          </Nav>
      </Navbar>
    
  );
}
export default Navegacion;
