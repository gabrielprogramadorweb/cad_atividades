import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Table, Button, FormControl, Row, Col } from 'react-bootstrap';
import { getAtividades, getProjetos } from '../../services/api/api';
import './Dashboard.css';

const Dashboard = () => {
    const [dadosGraficoBarras, setDadosGraficoBarras] = useState([]);
    const [dadosGraficoPizza, setDadosGraficoPizza] = useState([]);
    const [dadosGraficoLinha, setDadosGraficoLinha] = useState([]);
    const [atividadesRecentes, setAtividadesRecentes] = useState([]);
    const [atividades, setAtividades] = useState([]);
    const [projetos, setProjetos] = useState([]);
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');

    useEffect(() => {
        const buscarDados = async () => {
            try {
                const resultadoAtividades = await getAtividades();
                const resultadoProjetos = await getProjetos();

                setAtividades(resultadoAtividades);
                setProjetos(resultadoProjetos);
                filtrarDados(resultadoAtividades, resultadoProjetos);
            } catch (erro) {
                console.error("Erro ao buscar dados:", erro);
            }
        };

        buscarDados();
    }, []);

    const formatarData = (data) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(data).toLocaleDateString('pt-BR', options);
    };

    const filtrarDados = (resultadoAtividades, resultadoProjetos) => {
        const atividadesFiltradas = resultadoAtividades.filter(atividade => {
            const dataAtividade = new Date(atividade.dataCadastro);
            const inicio = dataInicio ? new Date(dataInicio) : new Date('1970-01-01');
            const fim = dataFim ? new Date(dataFim) : new Date();
            return dataAtividade >= inicio && dataAtividade <= fim;
        });

        const dados = resultadoProjetos.map(projeto => {
            const atividadesDoProjeto = atividadesFiltradas.filter(atividade => atividade.idProjeto === projeto.id);
            return {
                nome: projeto.descricao,
                quantidadeAtividades: atividadesDoProjeto.length,
            };
        });

        const dadosPizza = resultadoProjetos.map(projeto => {
            const atividadesDoProjeto = atividadesFiltradas.filter(atividade => atividade.idProjeto === projeto.id);
            return {
                nome: projeto.descricao,
                valor: atividadesDoProjeto.length,
            };
        });

        const dadosLinha = atividadesFiltradas.map(atividade => ({
            data: formatarData(atividade.dataCadastro),
            quantidadeAtividades: 1,
        })).reduce((acc, curr) => {
            const encontrado = acc.find(item => item.data === curr.data);
            if (encontrado) {
                encontrado.quantidadeAtividades += 1;
            } else {
                acc.push(curr);
            }
            return acc;
        }, []);

        setDadosGraficoBarras(dados);
        setDadosGraficoPizza(dadosPizza);
        setDadosGraficoLinha(dadosLinha);
        setAtividadesRecentes(atividadesFiltradas.slice(-5));
    };

    const lidarComFiltroData = () => {
        filtrarDados(atividades, projetos);
    };

    const CORES = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const obterDescricaoProjeto = (idProjeto) => {
        const projeto = projetos.find(proj => proj.id === idProjeto);
        return projeto ? projeto.descricao : 'Projeto não encontrado';
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-2">Dashboard</h2>

            <Row className="mb-2">
                <Col>
                    <FormControl
                        type="date"
                        placeholder="Data de Início"
                        value={dataInicio}
                        onChange={(e) => setDataInicio(e.target.value)}
                    />
                </Col>
                <Col>
                    <FormControl
                        type="date"
                        placeholder="Data de Fim"
                        value={dataFim}
                        onChange={(e) => setDataFim(e.target.value)}
                    />
                </Col>
                <Col>
                    <Button variant="primary" onClick={lidarComFiltroData}>Filtrar Projetos por data</Button>
                </Col>
            </Row>

            <ResponsiveContainer width="100%" height={400} className="mb-4">
                <BarChart data={dadosGraficoBarras} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="nome" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="quantidadeAtividades" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>

            <Row className="mb-4">
                <Col md={6}>
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Pie
                                data={dadosGraficoPizza}
                                cx="50%"
                                cy="50%"
                                outerRadius={150}
                                fill="#8884d8"
                                dataKey="valor"
                                label
                            >
                                {dadosGraficoPizza.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={CORES[index % CORES.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </Col>
                <Col md={6}>
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={dadosGraficoLinha} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="data" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="quantidadeAtividades" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                </Col>
            </Row>

            <h3 className="mb-3">Atividades Recentes</h3>
            <Table striped bordered hover responsive>
                <thead className="thead-light-blue">
                <tr>
                    <th>ID</th>
                    <th>Data Cadastro</th>
                    <th>Descrição</th>
                    <th>Projeto</th>
                </tr>
                </thead>
                <tbody>
                {atividadesRecentes.map((atividade) => (
                    <tr key={atividade.id}>
                        <td>{atividade.id}</td>
                        <td>{formatarData(atividade.dataCadastro)}</td>
                        <td>{atividade.descricao}</td>
                        <td>{obterDescricaoProjeto(atividade.idProjeto)}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Dashboard;
