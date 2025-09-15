import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import UsersPage from './pages/UsersPage';
import TarantulaListPage from './pages/TarantulaListPage';
import AddTarantulaPage from './pages/AddTarantulaPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/tarantulas" element={<TarantulaListPage />} />
        <Route path="/tarantulas/new" element={<AddTarantulaPage />} />
      </Routes>
    </Router>
  );
}

export default App;
