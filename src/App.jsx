import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Groups from './pages/Groups';
import Assignments from './pages/Assignments';
import Submissions from './pages/Submissions';
import ProfessorDashboard from './pages/ProfessorDashboard';
import Navbar from './components/Navbar';
import './index.css';

function ProtectedRoute({ children, role }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }
  
  return children;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500">
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/groups" element={
              <ProtectedRoute>
                <Groups />
              </ProtectedRoute>
            } />
            <Route path="/assignments" element={
              <ProtectedRoute>
                <Assignments />
              </ProtectedRoute>
            } />
            <Route path="/submissions" element={
              <ProtectedRoute>
                <Submissions />
              </ProtectedRoute>
            } />
            <Route path="/professor" element={
              <ProtectedRoute role="professor">
                <ProfessorDashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;