import Toast from 'react-bootstrap/Toast';
import { useState } from 'react';
import { ToastContainer } from 'react-bootstrap';


function BasicToast( {titulo,mensaje} ) {
  const [position, setPosition] = useState('bottom-start'); 
  const [show, setShow] = useState(true);

  return (
    <ToastContainer className="p-3" position={position}>
    <Toast onClose={() => setShow(false)} show={show} delay={5000} autohide>
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto ">{titulo}</strong>
        
      </Toast.Header>
      <Toast.Body>{mensaje}</Toast.Body>
    </Toast>
    </ToastContainer>
  );
}

export default BasicToast;