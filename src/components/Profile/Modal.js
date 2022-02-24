import React from "react";
import { Modal, Button } from "react-bootstrap";

function ModalComponent({
  buttonActionText = "",
  heading,
  desc,
  show = true,
  onClose,
  onActionClick,
  showActionButton,
}) {
  return (
    <>
      <Modal show={show} onHide={onClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{desc}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          {showActionButton && (
            <Button variant="primary" onClick={onActionClick}>
              {buttonActionText}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalComponent;
