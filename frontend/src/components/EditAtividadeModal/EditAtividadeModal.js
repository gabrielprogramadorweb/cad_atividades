import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditAtividadeModal = ({ show, handleClose, atividade, handleSave, projetos }) => {
    const [formData, setFormData] = useState(atividade);

    useEffect(() => {
        setFormData(atividade);
    }, [atividade]);

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
                <Modal.Title>Editar Atividade</Modal.Title>
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
                    <Form.Group controlId="formProjeto">
                        <Form.Label>Projeto</Form.Label>
                        <Form.Control
                            as="select"
                            name="projetoId"
                            value={formData.projetoId}
                            onChange={handleChange}
                        >
                            <option value="">Selecione um projeto</option>
                            {projetos.map(projeto => (
                                <option key={projeto.id} value={projeto.id}>
                                    {projeto.descricao}
                                </option>
                            ))}
                        </Form.Control>
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

export default EditAtividadeModal;
