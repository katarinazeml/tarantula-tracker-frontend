import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import UsersPage from './pages/UsersPage';
import TarantulaListPage from './pages/TarantulaListPage';
import AddTarantulaPage from './pages/AddTarantulaPage';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '80px' // Account for fixed header
      }}>
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/tarantulas" element={<TarantulaListPage />} />
            <Route path="/tarantulas/new" element={<AddTarantulaPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
