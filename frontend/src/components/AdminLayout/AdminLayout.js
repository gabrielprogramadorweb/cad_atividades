import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Dashboard from '../Dashboard/Dashboard';
import AtividadesList from '../AtividadesList/AtividadesList';
import ProjetosList from '../ProjetosList/ProjetosList';
import './AdminLayout.css';

const AdminLayout = () => {
    return (
        <Router>
            <div id="wrapper">
                <Sidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <Topbar />
                        <div className="container-fluid">
                            <Routes>
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/atividades" element={<AtividadesList />} />
                                <Route path="/projetos" element={<ProjetosList />} />
                            </Routes>
                        </div>
                    </div>
                </div>
            </div>
        </Router>
    );
};

export default AdminLayout;
