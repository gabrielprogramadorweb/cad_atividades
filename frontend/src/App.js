import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './components/AdminLayout/AdminLayout';

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/*" element={<AdminLayout />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
