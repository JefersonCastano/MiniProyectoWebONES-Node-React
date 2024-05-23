
import { useEffect, useState } from 'react';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import HorarioForm from '../forms/HorarioForm';
import { useCommonHorarioContext } from '../CommonHorarioContext';

function ModalBS({ children, closeModal, setCloseModal }) {

  const [show, setShow] = useState(false);
  const { state, states, franjaActual } = useCommonHorarioContext();

  const handleClose = () => {
    setShow(false);
    setCloseModal(false);
  }
  const handleShow = () => setShow(true);

  let buttonChild;
  let formChild;
  let otherChildren = [];

  useEffect(() => {
    if (closeModal) {
      handleClose();
    }
  }, [closeModal]);

  React.Children.forEach(children, (child, index) => {
    if (React.isValidElement(child)) {
      if (child.type === 'button') {
        buttonChild = React.cloneElement(child, {
          onClick: (e) => {
            if (child.props.onClick) {
              child.props.onClick();
            }
            handleShow();
          }
        });
      } else if (child.type === HorarioForm) {
        formChild = React.cloneElement(child, { ...child.props, handleClose, key: index });
      }else{
        otherChildren.push(child);
      }
    }
  });

  return (
    <>
      {buttonChild}
      <Modal show={show} onHide={handleClose} size="md" backdrop="static" keyboard={false} centered>
        {
          state === 'consulting' &&
          <Modal.Header closeButton/>
        }
        <Modal.Body>
          { franjaActual.state != 'new' && state != states.consulting && otherChildren}
          {formChild}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalBS;