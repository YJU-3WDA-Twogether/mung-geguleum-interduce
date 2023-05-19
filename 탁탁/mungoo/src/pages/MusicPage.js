import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import D3 from './D3';

function MusicPage() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Button variant="primary" onClick={openModal}>
        모달 열기
      </Button>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>모달 타이틀</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <D3 />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MusicPage;
