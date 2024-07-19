import React, { useState, useEffect } from 'react';
import { Table, Button, Pagination, FormControl } from 'react-bootstrap';
import { getProjetos, deleteProjeto, updateProjeto, createProjeto } from '../../services/api/api';
import './ProjetosList.css';
import EditProjetoModal from '../Modal/EditProjetoModal/EditProjetoModal';
import CadastroProjetoModal from '../Modal/CadastroProjetoModal/CadastroProjetoModal';
import ConfirmeDeleteProjetoModal from '../Modal/ConfirmeDeleteProjeto/ConfirmeDeleteProjetoModal';

const ProjetosList = () => {
    const [projetos, setProjetos] = useState([]);
    const [projetoSelecionado, setProjetoSelecionado] = useState(null);
    const [mostrarEditarModal, setMostrarEditarModal] = useState(false);
    const [mostrarCadastroProjetoModal, setMostrarCadastroProjetoModal] = useState(false);
    const [erro, setErro] = useState(null);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [termoDeBusca, setTermoDeBusca] = useState('');
    const itensPorPagina = 5;
    const [mostrarConfirmDeleteModal, setMostrarConfirmDeleteModal] = useState(false);
    const [projetoParaDeletar, setProjetoParaDeletar] = useState(null);

    const buscarProjetos = async () => {
        try {
            const resultadoProjetos = await getProjetos();
            console.log('Projetos buscados:', resultadoProjetos);
            setProjetos(resultadoProjetos);
        } catch (erro) {
            setErro(erro.message);
        }
    };

    useEffect(() => {
        buscarProjetos();
    }, []);

    const lidarComDelecao = (id) => {
        setProjetoParaDeletar(id);
        setMostrarConfirmDeleteModal(true);
    };

    const confirmarDelecao = async () => {
        try {
            await deleteProjeto(projetoParaDeletar);
            setProjetos(projetos.filter(projeto => projeto.id !== projetoParaDeletar));
            setMostrarConfirmDeleteModal(false);
            setProjetoParaDeletar(null);
        } catch (erro) {
            setErro(erro.message);
        }
    };

    const lidarComEdicao = (projeto) => {
        setProjetoSelecionado(projeto);
        setMostrarEditarModal(true);
    };

    const salvarEdicao = async (projetoAtualizado) => {
        try {
            const respostaProjetoAtualizado = await updateProjeto(projetoAtualizado.id, projetoAtualizado);
            setProjetos(projetos.map(projeto =>
                projeto.id === projetoAtualizado.id ? respostaProjetoAtualizado : projeto
            ));
            setMostrarEditarModal(false);
            buscarProjetos();
        } catch (erro) {
            setErro(erro.message);
        }
    };

    const salvarCadastroProjeto = async (novoProjeto) => {
        try {
            const projetoCriado = await createProjeto(novoProjeto);
            setProjetos([...projetos, projetoCriado]);
            buscarProjetos();
        } catch (erro) {
            setErro(erro.message);
        }
    };

    const mudarPagina = (numeroDaPagina) => {
        setPaginaAtual(numeroDaPagina);
    };

    const projetosFiltrados = projetos.filter(projeto =>
        projeto.id && projeto.id.toString().toLowerCase().includes(termoDeBusca.toLowerCase())
    );

    const indiceUltimoItem = paginaAtual * itensPorPagina;
    const indicePrimeiroItem = indiceUltimoItem - itensPorPagina;
    const itensAtuais = projetosFiltrados.slice(indicePrimeiroItem, indiceUltimoItem);
    const totalPaginas = Math.ceil(projetosFiltrados.length / itensPorPagina);

    if (erro) {
        return <div className="alert alert-danger" role="alert">Erro: {erro}</div>;
    }

    return (
        <div className="container">
            <h2 className="">Lista de Projetos</h2>
            <Button className="mb-2" onClick={() => setMostrarCadastroProjetoModal(true)}>Cadastrar Projeto</Button>
            <FormControl
                type="text"
                placeholder="Pesquisar projetos"
                className="mb-3"
                value={termoDeBusca}
                onChange={(e) => setTermoDeBusca(e.target.value)}
            />
            <Table striped bordered hover responsive>
                <thead>
                <tr className="bg-primary">
                    <th>ID</th>
                    <th>Descrição</th>
                    <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                {itensAtuais.map((projeto) => (
                    <tr key={projeto.id}>
                        <td>{projeto.id}</td>
                        <td>{projeto.descricao}</td>
                        <td>
                            <Button variant="danger" className="mr-2" onClick={() => lidarComDelecao(projeto.id)}>Excluir</Button>
                            <Button variant="warning" onClick={() => lidarComEdicao(projeto)}>Editar</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <div className="d-flex justify-content-between align-items-center mt-2">
                <div>
                    Mostrando de {indicePrimeiroItem + 1} a {indiceUltimoItem > projetosFiltrados.length ? projetosFiltrados.length : indiceUltimoItem} de {projetosFiltrados.length} resultados
                </div>
                <Pagination>
                    {[...Array(totalPaginas)].map((_, index) => (
                        <Pagination.Item key={index + 1} active={index + 1 === paginaAtual} onClick={() => mudarPagina(index + 1)}>
                            {index + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </div>
            {projetoSelecionado && (
                <EditProjetoModal
                    show={mostrarEditarModal}
                    handleClose={() => setMostrarEditarModal(false)}
                    projeto={projetoSelecionado}
                    handleSave={salvarEdicao}
                />
            )}
            <CadastroProjetoModal
                show={mostrarCadastroProjetoModal}
                handleClose={() => setMostrarCadastroProjetoModal(false)}
                handleSave={salvarCadastroProjeto}
            />
            <ConfirmeDeleteProjetoModal
                show={mostrarConfirmDeleteModal}
                handleClose={() => setMostrarConfirmDeleteModal(false)}
                handleConfirm={confirmarDelecao}
            />
        </div>
    );
};

export default ProjetosList;
