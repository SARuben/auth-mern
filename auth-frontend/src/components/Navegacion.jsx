import React from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import { BoxArrowInRight,BoxArrowRight } from "react-bootstrap-icons";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink} from "react-router-dom";

function Navegacion( {user, logout}) {
  return (
    
      <Navbar className="navbar" expand="lg" bg="dark" variant="dark">
          <Navbar.Brand id="navbrand" href="/">Autenticacion React
          </Navbar.Brand>
          <h4 className="usu-conectado">{user ?`Hola ${user}`: 'Bienvenid@'}</h4>
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
            <NavLink className="navlink btn"  to="/mail">Mail</NavLink>
            </section>
          </Nav>
      </Navbar>
    
  );
}
export default Navegacion;
