import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmDeleteProjetoModal = ({ show, handleClose, handleConfirm }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmar Exclusão</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Tem certeza que deseja excluir este projeto? Todas as atividades associadas a este projeto também serão excluídas.
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="danger" onClick={handleConfirm}>
                    Excluir
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmDeleteProjetoModal;
