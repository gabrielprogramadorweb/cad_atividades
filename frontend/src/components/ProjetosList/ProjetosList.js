import React, { useState, useEffect } from 'react';
import { Table, Button, Pagination, FormControl } from 'react-bootstrap';
import { getProjetos, deleteProjeto, updateProjeto, createProjeto } from '../../services/api/api';
import './ProjetosList.css';
import EditProjetoModal from '../Modal/EditProjetoModal';
import CadastroProjetoModal from '../Modal/CadastroProjetoModal';
import ConfirmDeleteProjetoModal from '../Modal/ConfirmDeleteProjetoModal';

const ProjetosList = () => {
    const [projetos, setProjetos] = useState([]);
    const [selectedProjeto, setSelectedProjeto] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCadastroProjetoModal, setShowCadastroProjetoModal] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 5;
    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
    const [projetoToDelete, setProjetoToDelete] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const projetosResult = await getProjetos();
                console.log('Projetos buscados:', projetosResult);
                setProjetos(projetosResult);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchData();
    }, []);

    const handleDelete = (id) => {
        setProjetoToDelete(id);
        setShowConfirmDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteProjeto(projetoToDelete);
            setProjetos(projetos.filter(projeto => projeto.id !== projetoToDelete));
            setShowConfirmDeleteModal(false);
            setProjetoToDelete(null);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleEdit = (projeto) => {
        setSelectedProjeto(projeto);
        setShowEditModal(true);
    };

    const handleSaveEdit = async (updatedProjeto) => {
        try {
            const updatedProjetoResponse = await updateProjeto(updatedProjeto.id, updatedProjeto);
            setProjetos(projetos.map(projeto =>
                projeto.id === updatedProjeto.id ? updatedProjetoResponse : projeto
            ));
            setShowEditModal(false);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSaveCadastroProjeto = async (newProjeto) => {
        try {
            const createdProjeto = await createProjeto(newProjeto);
            setProjetos([...projetos, createdProjeto]);
        } catch (error) {
            setError(error.message);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const filteredProjetos = projetos.filter(projeto =>
        projeto.descricao && projeto.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProjetos.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredProjetos.length / itemsPerPage);

    if (error) {
        return <div className="alert alert-danger" role="alert">Error: {error}</div>;
    }

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Lista de Projetos</h1>
            <Button className="mb-3" onClick={() => setShowCadastroProjetoModal(true)}>Cadastrar Projeto</Button>
            <FormControl
                type="text"
                placeholder="Pesquisar projetos"
                className="mb-3"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Table striped bordered hover responsive>
                <thead className="thead-dark">
                <tr>
                    <th>ID</th>
                    <th>Descrição</th>
                    <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                {currentItems.map((projeto) => (
                    <tr key={projeto.id}>
                        <td>{projeto.id}</td>
                        <td>{projeto.descricao}</td>
                        <td>
                            <Button variant="danger" className="mr-2" onClick={() => handleDelete(projeto.id)}>Excluir</Button>
                            <Button variant="warning" onClick={() => handleEdit(projeto)}>Editar</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <Pagination>
                {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
            {selectedProjeto && (
                <EditProjetoModal
                    show={showEditModal}
                    handleClose={() => setShowEditModal(false)}
                    projeto={selectedProjeto}
                    handleSave={handleSaveEdit}
                />
            )}
            <CadastroProjetoModal
                show={showCadastroProjetoModal}
                handleClose={() => setShowCadastroProjetoModal(false)}
                handleSave={handleSaveCadastroProjeto}
            />
            <ConfirmDeleteProjetoModal
                show={showConfirmDeleteModal}
                handleClose={() => setShowConfirmDeleteModal(false)}
                handleConfirm={confirmDelete}
            />
        </div>
    );
};

export default ProjetosList;
