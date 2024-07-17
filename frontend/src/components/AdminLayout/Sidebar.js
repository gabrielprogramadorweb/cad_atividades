import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaProjectDiagram, FaTasks } from 'react-icons/fa';
import '../../styles/sb-admin-2.css';

const Sidebar = () => {
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                <div className="sidebar-brand-icon rotate-n-15">
                    <FaTachometerAlt />
                </div>
                <div className="sidebar-brand-text mx-3"> Admin <sup></sup></div>
            </a>
            <hr className="sidebar-divider my-0" />
            <li className="nav-item active">
                <Link className="nav-link" to="/dashboard">
                    <FaTachometerAlt />&nbsp;
                    <span>Dashboard</span>
                </Link>
            </li>
            <hr className="sidebar-divider" />
            <li className="nav-item">
                <Link className="nav-link" to="/atividades">
                    <FaTasks />&nbsp;
                    <span>Atividades</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/projetos">
                    <FaProjectDiagram />&nbsp;
                    <span>Projetos</span>
                </Link>
            </li>
            <hr className="sidebar-divider d-none d-md-block" />
            <div className="text-center d-none d-md-inline">
                <button className="rounded-circle border-0" id="sidebarToggle"></button>
            </div>
        </ul>
    );
};

export default Sidebar;
