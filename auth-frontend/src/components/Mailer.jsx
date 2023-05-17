import react from "react";
import { Container, Button, Card } from "react-bootstrap";
import { Navigate } from "react-router-dom";

import { useState } from "react"
import emailjs from "@emailjs/browser";
import Form from "react-bootstrap/Form";



function Mailer({setestadoToast}) {
  const [envioCorreo, setenvioCorreo] = useState(false);
  
  const handleEnvioExitoso = () => {
    setestadoToast(true,'Envio de correo','correo enviado exitosamente')
    setenvioCorreo(true)
  } 

  const handleEnvioFallido = () => {
    setenvioCorreo(true)
    setestadoToast(true,'Envio de correo','Ha ocurrido un error en el envio del correo')
  }

  const handleSubmit = (e) => {
    e.preventDefault(e);
    emailjs.sendForm(import.meta.env.VITE_MAIL_SERVICE,import.meta.env.VITE_MAIL_TEMPLATE,e.target,import.meta.env.VITE_MAIL_SERIAL)
    .then(response => handleEnvioExitoso())
    .catch(error =>   handleEnvioFallido())
  };

  return (
    <Container className="col-sm-6" id="form-contacto">
      { envioCorreo &&  <Navigate to ="/" />}
      <Card>
        <Card.Header className="text-center">Formulario de Contacto</Card.Header>
        <Card.Body>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="string"
                placeholder="Nombre"
                name="user_name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                name="user_email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAsunto">
              <Form.Label>Mensaje</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Asunto"
                name="user_asunto"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEnvio">
              <Button type="submit" className="mb-3" variant="primary">
                Enviar
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
export default Mailer;
