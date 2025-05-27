import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import Home from './pages/Home';
import DataPelanggaran from './pages/DataPelanggaran';
import Pengaduan from './pages/Pengaduan';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
// import DataFoto from './pages/DataFoto';
// import DataVideo from './pages/DataVideo';
import DataPengaduan from './pages/DataPengaduan';
import Pelanggaran from './pages/Pelanggaran';
import LoginAdmin from './pages/Login';
import ProtectedRoute from './components/AdminDashboard/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/DataPelanggaran' element={<DataPelanggaran />} />
        <Route path='/Pengaduan' element={<Pengaduan />} />
        <Route path='/LoginAdmin' element={<LoginAdmin />} />
        
        {/* Lindungi halaman-halaman penting */}
        <Route path="/Dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        {/* <Route path="/DataPelanggaran" element={<ProtectedRoute><DataPelanggaran /></ProtectedRoute>} /> */}
        <Route path="/Pengaduan" element={<ProtectedRoute><Pengaduan /></ProtectedRoute>} />
        <Route path="/Pelanggaran" element={<ProtectedRoute><Pelanggaran /></ProtectedRoute>} />
        <Route path="/DataPengaduan" element={<ProtectedRoute><DataPengaduan /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
