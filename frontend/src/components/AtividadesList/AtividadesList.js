import React, { useState, useEffect } from 'react';
import { Table, Button, Pagination, FormControl } from 'react-bootstrap';
import { getAtividades, deleteAtividade, updateAtividade, createAtividade, createProjeto, getProjetos } from '../../services/api/api';
import './AtividadesList.css';
import EditAtividadeModal from '../Modal/EditAtividadeModal/EditAtividadeModal';
import CadastroAtividadeModal from '../Modal/CadastroAtividadeModal/CadastroAtividadeModal';
import ConfirmeDeleteAtividadeModal from "../Modal/ConfirmeDeleteAtividadeModal/ConfirmeDeleteAtividadeModal";

const AtividadesList = () => {
    const [atividades, setAtividades] = useState([]);
    const [projetos, setProjetos] = useState([]);
    const [atividadeSelecionada, setAtividadeSelecionada] = useState(null);
    const [mostrarModalEdicao, setMostrarModalEdicao] = useState(false);
    const [mostrarModalCadastroAtividade, setMostrarModalCadastroAtividade] = useState(false);
    const [erro, setErro] = useState(null);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [termoDeBusca, setTermoDeBusca] = useState('');
    const itensPorPagina = 5;
    const [mostrarModalConfirmacaoExclusao, setMostrarModalConfirmacaoExclusao] = useState(false);
    const [atividadeParaExcluir, setAtividadeParaExcluir] = useState(null);

    const buscarAtividades = async () => {
        try {
            const resultadoAtividades = await getAtividades();
            const resultadoProjetos = await getProjetos();

            const atividadesComProjetos = resultadoAtividades.map(atividade => {
                const projeto = resultadoProjetos.find(projeto => projeto.id === atividade.idProjeto);
                return {
                    ...atividade,
                    projetoDescricao: projeto ? projeto.descricao : 'Projeto não encontrado'
                };
            });

            setAtividades(atividadesComProjetos);
            setProjetos(resultadoProjetos);
        } catch (error) {
            setErro(error.message);
        }
    };

    useEffect(() => {
        buscarAtividades();
    }, []);

    const formatarData = (data) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(data).toLocaleDateString('pt-BR', options);
    };

    const lidarComExclusao = (id) => {
        setAtividadeParaExcluir(id);
        setMostrarModalConfirmacaoExclusao(true);
    };

    const confirmarExclusao = async () => {
        try {
            await deleteAtividade(atividadeParaExcluir);
            setAtividades(atividades.filter(atividade => atividade.id !== atividadeParaExcluir));
            setMostrarModalConfirmacaoExclusao(false);
            setAtividadeParaExcluir(null);
        } catch (error) {
            setErro(error.message);
        }
    };

    const lidarComEdicao = (atividade) => {
        setAtividadeSelecionada(atividade);
        setMostrarModalEdicao(true);
    };

    const salvarEdicao = async (atividadeAtualizada) => {
        try {
            const { projetoDescricao, ...dadosAtividade } = atividadeAtualizada;
            const respostaAtividadeAtualizada = await updateAtividade(atividadeAtualizada.id, dadosAtividade);

            const projeto = projetos.find(projeto => projeto.id === respostaAtividadeAtualizada.idProjeto);
            const atividadeComProjeto = {
                ...respostaAtividadeAtualizada,
                projetoDescricao: projeto ? projeto.descricao : 'Projeto não encontrado'
            };

            setAtividades(atividades.map(atividade =>
                atividade.id === respostaAtividadeAtualizada.id ? atividadeComProjeto : atividade
            ));
            setMostrarModalEdicao(false);
        } catch (error) {
            setErro(error.message);
        }
    };

    const salvarCadastroAtividade = async (novaAtividade) => {
        try {
            const atividadeCriada = await createAtividade(novaAtividade);

            const projeto = projetos.find(projeto => projeto.id === atividadeCriada.idProjeto);
            const atividadeComProjeto = {
                ...atividadeCriada,
                projetoDescricao: projeto ? projeto.descricao : 'Projeto não encontrado'
            };

            setAtividades(prevAtividades => [...prevAtividades, atividadeComProjeto]);
            setMostrarModalCadastroAtividade(false);
            buscarAtividades();
        } catch (error) {
            setErro(error.message);
        }
    };

    const mudarPagina = (numeroDaPagina) => {
        setPaginaAtual(numeroDaPagina);
    };

    const atividadesFiltradas = atividades.filter(atividade =>
        atividade.id && atividade.id.toLowerCase().includes(termoDeBusca.toLowerCase())
    );

    const indexDoUltimoItem = paginaAtual * itensPorPagina;
    const indexDoPrimeiroItem = indexDoUltimoItem - itensPorPagina;
    const itensAtuais = atividadesFiltradas.slice(indexDoPrimeiroItem, indexDoUltimoItem);
    const totalDePaginas = Math.ceil(atividadesFiltradas.length / itensPorPagina);

    if (erro) {
        return <div className="alert alert-danger" role="alert">Erro: {erro}</div>;
    }

    return (
        <div className="container">
            <h2 className="">Lista de Atividades</h2>
            <Button className="mb-2" onClick={() => setMostrarModalCadastroAtividade(true)}>Cadastrar Atividade</Button>
            <FormControl
                type="text"
                placeholder="Pesquisar atividades"
                className="mb-3"
                value={termoDeBusca}
                onChange={(e) => setTermoDeBusca(e.target.value)}
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
                {itensAtuais.map((atividade) => (
                    <tr key={atividade.id}>
                        <td>{atividade.id}</td>
                        <td>{formatarData(atividade.dataCadastro)}</td>
                        <td>{atividade.descricao}</td>
                        <td>{atividade.projetoDescricao}</td>
                        <td>
                            <Button variant="danger" className="mr-2" onClick={() => lidarComExclusao(atividade.id)}>Excluir</Button>
                            <Button variant="warning" onClick={() => lidarComEdicao(atividade)}>Editar</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <div className="d-flex justify-content-between align-items-center mt-2">
                <div>
                    Mostrando de {indexDoPrimeiroItem + 1} a {indexDoUltimoItem > atividadesFiltradas.length ? atividadesFiltradas.length : indexDoUltimoItem} de {atividadesFiltradas.length} resultados
                </div>
                <Pagination>
                    {[...Array(totalDePaginas)].map((_, index) => (
                        <Pagination.Item key={index + 1} active={index + 1 === paginaAtual} onClick={() => mudarPagina(index + 1)}>
                            {index + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </div>
            {atividadeSelecionada && (
                <EditAtividadeModal
                    show={mostrarModalEdicao}
                    handleClose={() => setMostrarModalEdicao(false)}
                    atividade={atividadeSelecionada}
                    handleSave={salvarEdicao}
                    projetos={projetos}
                />
            )}
            <CadastroAtividadeModal
                show={mostrarModalCadastroAtividade}
                handleClose={() => setMostrarModalCadastroAtividade(false)}
                handleSave={salvarCadastroAtividade}
                projetos={projetos}
            />
            <ConfirmeDeleteAtividadeModal
                show={mostrarModalConfirmacaoExclusao}
                handleClose={() => setMostrarModalConfirmacaoExclusao(false)}
                handleConfirm={confirmarExclusao}
            />
        </div>
    );
};

export default AtividadesList;
