import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import Topbar from './Topbar/Topbar';
import Dashboard from '../Dashboard/Dashboard';
import AtividadesList from '../AtividadesList/AtividadesList';
import ProjetosList from '../ProjetosList/ProjetosList';
import './AdminLayout.css';

const AdminLayout = () => {
    return (
        <div id="wrapper">
            <Sidebar />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Topbar />
                    <div className="container-fluid">
                        <Routes>
                            <Route path="/dashboard"  element={<Dashboard />} />
                            <Route path="/atividades" element={<AtividadesList />} />
                            <Route path="/projetos"   element={<ProjetosList />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
