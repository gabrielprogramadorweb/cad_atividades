import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Table, Button, FormControl, Row, Col } from 'react-bootstrap';
import { getAtividades, getProjetos } from '../../services/api/api';
import './Dashboard.css';

const Dashboard = () => {
    const [chartData, setChartData] = useState([]);
    const [pieChartData, setPieChartData] = useState([]);
    const [lineChartData, setLineChartData] = useState([]);
    const [recentAtividades, setRecentAtividades] = useState([]);
    const [atividades, setAtividades] = useState([]);
    const [projetos, setProjetos] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const atividadesResult = await getAtividades();
                const projetosResult = await getProjetos();

                setAtividades(atividadesResult);
                setProjetos(projetosResult);
                filterData(atividadesResult, projetosResult);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const filterData = (atividadesResult, projetosResult) => {
        const filteredAtividades = atividadesResult.filter(atividade => {
            const atividadeDate = new Date(atividade.dataCadastro);
            const start = startDate ? new Date(startDate) : new Date('1970-01-01');
            const end = endDate ? new Date(endDate) : new Date();
            return atividadeDate >= start && atividadeDate <= end;
        });

        const data = projetosResult.map(projeto => {
            const atividadesDoProjeto = filteredAtividades.filter(atividade => atividade.idProjeto === projeto.id);
            return {
                name: projeto.descricao,
                atividadesCount: atividadesDoProjeto.length,
            };
        });

        const pieData = projetosResult.map(projeto => {
            const atividadesDoProjeto = filteredAtividades.filter(atividade => atividade.idProjeto === projeto.id);
            return {
                name: projeto.descricao,
                value: atividadesDoProjeto.length,
            };
        });

        const lineData = filteredAtividades.map(atividade => ({
            date: atividade.dataCadastro,
            atividadesCount: 1,
        })).reduce((acc, curr) => {
            const found = acc.find(item => item.date === curr.date);
            if (found) {
                found.atividadesCount += 1;
            } else {
                acc.push(curr);
            }
            return acc;
        }, []);

        setChartData(data);
        setPieChartData(pieData);
        setLineChartData(lineData);
        setRecentAtividades(filteredAtividades.slice(-5));
    };

    const handleDateFilter = () => {
        filterData(atividades, projetos);
    };

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const getProjectDescription = (idProjeto) => {
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
                        placeholder="Start Date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </Col>
                <Col>
                    <FormControl
                        type="date"
                        placeholder="End Date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </Col>
                <Col>
                    <Button variant="primary" onClick={handleDateFilter}>Filtrar Projetos por data</Button>
                </Col>
            </Row>

            <ResponsiveContainer width="100%" height={400} className="mb-4">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="atividadesCount" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>

            <Row className="mb-4">
                <Col md={6}>
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Pie
                                data={pieChartData}
                                cx="50%"
                                cy="50%"
                                outerRadius={150}
                                fill="#8884d8"
                                dataKey="value"
                                label
                            >
                                {pieChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </Col>
                <Col md={6}>
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={lineChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="atividadesCount" stroke="#8884d8" />
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
                {recentAtividades.map((atividade) => (
                    <tr key={atividade.id}>
                        <td>{atividade.id}</td>
                        <td>{atividade.dataCadastro}</td>
                        <td>{atividade.descricao}</td>
                        <td>{getProjectDescription(atividade.idProjeto)}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Dashboard;
