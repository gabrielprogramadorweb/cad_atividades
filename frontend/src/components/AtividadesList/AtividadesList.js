import React, { useState, useEffect } from 'react';
import { Table, Button, Pagination, FormControl } from 'react-bootstrap';
import { getAtividades, deleteAtividade, updateAtividade, createAtividade, createProjeto, getProjetos } from '../../services/api/api';
import './AtividadesList.css';
import EditAtividadeModal from '../EditAtividadeModal/EditAtividadeModal';
import CadastroAtividadeModal from '../CadastroAtividadeModal/CadastroAtividadeModal';

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const atividadesResult = await getAtividades();
                const projetosResult = await getProjetos();

                // Associar projetos às atividades
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
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteAtividade(id);
            setAtividades(atividades.filter(atividade => atividade.id !== id));
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
            const updatedAtividadeResponse = await updateAtividade(updatedAtividade.id, updatedAtividade);
            setAtividades(atividades.map(atividade =>
                atividade.id === updatedAtividade.id ? updatedAtividadeResponse : atividade
            ));
            setShowEditModal(false);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSaveCadastroAtividade = async (newAtividade) => {
        try {
            const createdAtividade = await createAtividade(newAtividade);
            setAtividades([...atividades, createdAtividade]);
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
        atividade.id.toLowerCase().includes(searchTerm.toLowerCase())
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
            <Button className="mb-3" onClick={() => setShowCadastroAtividadeModal(true)}>Cadastrar Atividade</Button>
            <FormControl
                type="text"
                placeholder="Pesquisar atividades"
                className="mb-3"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Table striped bordered hover responsive>
                <thead className="thead-dark">
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
            <Pagination>
                {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
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
        </div>
    );
};

export default AtividadesList;
