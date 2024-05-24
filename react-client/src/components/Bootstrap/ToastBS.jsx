import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

function ToastBS({ show, toggleShow, title, message }) {
  return (
    <ToastContainer
      className="p-3"
      position="top-end"
      style={{ zIndex: 10000 }}
    >
      <Toast show={show} onClose={toggleShow} bg="" delay={5000} autohide>
        <Toast.Header>
          <span className="toast-header-icon rounded me-2"></span>
          <strong className="me-auto">{title}</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default ToastBS;