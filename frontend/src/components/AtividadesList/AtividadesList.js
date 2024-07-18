import React, { useState, useEffect } from 'react';
import { Table, Button, Pagination, FormControl } from 'react-bootstrap';
import { getAtividades, deleteAtividade, updateAtividade, createAtividade, createProjeto, getProjetos } from '../../services/api/api';
import './AtividadesList.css';
import EditAtividadeModal from '../EditAtividadeModal/EditAtividadeModal';
import CadastroAtividadeModal from '../CadastroAtividadeModal/CadastroAtividadeModal';
import ConfirmDeleteAtividadeModal from "../Modal/ConfirmDeleteAtividadeModal";

const AtividadesList = () => {
    const [atividades, setAtividades] = useState([]);
    const [projetos, setProjetos] = useState([]);
    const [selectedAtividade, setSelectedAtividade] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCadastroAtividadeModal, setShowCadastroAtividadeModal] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 5;
    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
    const [atividadeToDelete, setAtividadeToDelete] = useState(null);

    const fetchAtividades = async () => {
        try {
            const atividadesResult = await getAtividades();
            const projetosResult = await getProjetos();

            const atividadesComProjetos = atividadesResult.map(atividade => {
                const projeto = projetosResult.find(projeto => projeto.id === atividade.idProjeto);
                return {
                    ...atividade,
                    projetoDescricao: projeto ? projeto.descricao : 'Projeto não encontrado'
                };
            });

            setAtividades(atividadesComProjetos);
            setProjetos(projetosResult);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchAtividades();
    }, []);

    const handleDelete = (id) => {
        setAtividadeToDelete(id);
        setShowConfirmDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteAtividade(atividadeToDelete);
            setAtividades(atividades.filter(atividade => atividade.id !== atividadeToDelete));
            setShowConfirmDeleteModal(false);
            setAtividadeToDelete(null);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleEdit = (atividade) => {
        setSelectedAtividade(atividade);
        setShowEditModal(true);
    };

    const handleSaveEdit = async (updatedAtividade) => {
        try {
            const { projetoDescricao, ...atividadeData } = updatedAtividade;
            const updatedAtividadeResponse = await updateAtividade(updatedAtividade.id, atividadeData);

            const projeto = projetos.find(projeto => projeto.id === updatedAtividadeResponse.idProjeto);
            const atividadeComProjeto = {
                ...updatedAtividadeResponse,
                projetoDescricao: projeto ? projeto.descricao : 'Projeto não encontrado'
            };

            setAtividades(atividades.map(atividade =>
                atividade.id === updatedAtividadeResponse.id ? atividadeComProjeto : atividade
            ));
            setShowEditModal(false);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSaveCadastroAtividade = async (newAtividade) => {
        try {
            const createdAtividade = await createAtividade(newAtividade);

            const projeto = projetos.find(projeto => projeto.id === createdAtividade.idProjeto);
            const atividadeComProjeto = {
                ...createdAtividade,
                projetoDescricao: projeto ? projeto.descricao : 'Projeto não encontrado'
            };

            setAtividades(prevAtividades => [...prevAtividades, atividadeComProjeto]);
            setShowCadastroAtividadeModal(false);
            fetchAtividades();
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

    const filteredAtividades = atividades.filter(atividade =>
        atividade.id && atividade.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredAtividades.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredAtividades.length / itemsPerPage);

    if (error) {
        return <div className="alert alert-danger" role="alert">Error: {error}</div>;
    }

    return (
        <div className="container mt-5">
            <h3 className="mb-2">Lista de Atividades</h3>
            <Button className="mb-2" onClick={() => setShowCadastroAtividadeModal(true)}>Cadastrar Atividade</Button>
            <FormControl
                type="text"
                placeholder="Pesquisar atividades"
                className="mb-3"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Table striped bordered hover responsive>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Data Cadastro</th>
                    <th>Descrição</th>
                    <th>Projeto</th>
                    <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                {currentItems.map((atividade) => (
                    <tr key={atividade.id}>
                        <td>{atividade.id}</td>
                        <td>{atividade.dataCadastro}</td>
                        <td>{atividade.descricao}</td>
                        <td>{atividade.projetoDescricao}</td>
                        <td>
                            <Button variant="danger" className="mr-2" onClick={() => handleDelete(atividade.id)}>Excluir</Button>
                            <Button variant="warning" onClick={() => handleEdit(atividade)}>Editar</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <div className="d-flex justify-content-between align-items-center mt-2">
                <div>
                    Mostrando de {indexOfFirstItem + 1} a {indexOfLastItem > filteredAtividades.length ? filteredAtividades.length : indexOfLastItem} de {filteredAtividades.length} resultados
                </div>
                <Pagination>
                    {[...Array(totalPages)].map((_, index) => (
                        <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
                            {index + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </div>
            {selectedAtividade && (
                <EditAtividadeModal
                    show={showEditModal}
                    handleClose={() => setShowEditModal(false)}
                    atividade={selectedAtividade}
                    handleSave={handleSaveEdit}
                    projetos={projetos}
                />
            )}
            <CadastroAtividadeModal
                show={showCadastroAtividadeModal}
                handleClose={() => setShowCadastroAtividadeModal(false)}
                handleSave={handleSaveCadastroAtividade}
                projetos={projetos}
            />
            <ConfirmDeleteAtividadeModal
                show={showConfirmDeleteModal}
                handleClose={() => setShowConfirmDeleteModal(false)}
                handleConfirm={confirmDelete}
            />
        </div>
    );
};

export default AtividadesList;
