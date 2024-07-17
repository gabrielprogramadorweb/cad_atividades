import React, { useState, useEffect } from 'react';
import { getAtividades, deleteAtividade, updateAtividade, createAtividade, createProjeto, getProjetos } from '../../services/api/api';
import './AtividadesList.css';
import EditAtividadeModal from '../EditAtividadeModal/EditAtividadeModal';
import CadastroAtividadeModal from '../CadastroAtividadeModal/CadastroAtividadeModal';
import CadastroProjetoModal from '../CadastroProjetoModal/CadastroProjetoModal';

const AtividadesList = () => {
    const [atividades, setAtividades] = useState([]);
    const [projetos, setProjetos] = useState([]);
    const [selectedAtividade, setSelectedAtividade] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCadastroAtividadeModal, setShowCadastroAtividadeModal] = useState(false);
    const [showCadastroProjetoModal, setShowCadastroProjetoModal] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const atividadesResult = await getAtividades();
                setAtividades(atividadesResult);
                const projetosResult = await getProjetos();
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

    if (error) {
        return <div className="alert alert-danger" role="alert">Error: {error}</div>;
    }

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Lista de Atividades</h1>
            <button className="btn btn-primary mb-3" onClick={() => setShowCadastroAtividadeModal(true)}>Cadastrar Atividade</button>
            <button className="btn btn-secondary mb-3 ml-2" onClick={() => setShowCadastroProjetoModal(true)}>Cadastrar Projeto</button>
            <table className="table table-bordered">
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
                {atividades.map((atividade) => (
                    <tr key={atividade.id}>
                        <td>{atividade.id}</td>
                        <td>{atividade.dataCadastro}</td>
                        <td>{atividade.descricao}</td>
                        <td>{atividade.projetoDescricao}</td>
                        <td>
                            <button
                                className="btn btn-danger mr-2"
                                onClick={() => handleDelete(atividade.id)}>
                                Excluir
                            </button>
                            <button
                                className="btn btn-warning"
                                onClick={() => handleEdit(atividade)}>
                                Editar
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {selectedAtividade && (
                <EditAtividadeModal
                    show={showEditModal}
                    handleClose={() => setShowEditModal(false)}
                    atividade={selectedAtividade}
                    handleSave={handleSaveEdit}
                    projetos={projetos} // Pass projects here
                />
            )}
            <CadastroAtividadeModal
                show={showCadastroAtividadeModal}
                handleClose={() => setShowCadastroAtividadeModal(false)}
                handleSave={handleSaveCadastroAtividade}
                projetos={projetos} // Pass projects here
            />
            <CadastroProjetoModal
                show={showCadastroProjetoModal}
                handleClose={() => setShowCadastroProjetoModal(false)}
                handleSave={handleSaveCadastroProjeto}
            />
        </div>
    );
};

export default AtividadesList;
