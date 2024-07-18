import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './components/AdminLayout/AdminLayout';
import Login from './components/Login/Login';
import Register from './components/Login/Register'; // Importe o componente de registro

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} /> {/* Adicione a rota de registro */}
                    <Route path="/*" element={<AdminLayout />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
