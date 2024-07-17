import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditProjetoModal = ({ show, handleClose, projeto, handleSave }) => {
    const [formData, setFormData] = useState(projeto);

    useEffect(() => {
        setFormData(projeto);
    }, [projeto]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        handleSave(formData);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Projeto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formDescricao">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                            type="text"
                            name="descricao"
                            value={formData.descricao}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Salvar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditProjetoModal;
