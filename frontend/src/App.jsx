import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { AuthProvider } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';

import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFound';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Student Pages
import AddStudent from './pages/student/AddStudent';
import StudentList from './pages/student/StudentList';
import MarkAttendance from './pages/student/MarkAttendance';
import ApplyLeave from './pages/student/ApplyLeave';
import ApplyOD from './pages/student/ApplyOD';
import ApplyOuting from './pages/student/ApplyOuting';
import StudentHistory from './pages/student/StudentHistory';

// Warden Pages
import PendingRequests from './pages/warden/PendingRequests';
import AttendanceReport from './pages/warden/AttendanceReport';

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Student Routes - Protected */}
            <Route path="/student/add" element={<ProtectedRoute requiredRole="STUDENT"><AddStudent /></ProtectedRoute>} />
            <Route path="/student/list" element={<ProtectedRoute requiredRole="STUDENT"><StudentList /></ProtectedRoute>} />
            <Route path="/student/attendance" element={<ProtectedRoute requiredRole="STUDENT"><MarkAttendance /></ProtectedRoute>} />
            <Route path="/student/leave" element={<ProtectedRoute requiredRole="STUDENT"><ApplyLeave /></ProtectedRoute>} />
            <Route path="/student/od" element={<ProtectedRoute requiredRole="STUDENT"><ApplyOD /></ProtectedRoute>} />
            <Route path="/student/outing" element={<ProtectedRoute requiredRole="STUDENT"><ApplyOuting /></ProtectedRoute>} />
            <Route path="/student/history" element={<ProtectedRoute requiredRole="STUDENT"><StudentHistory /></ProtectedRoute>} />

            {/* Warden Routes - Protected */}
            <Route path="/warden/pending" element={<ProtectedRoute requiredRole="WARDEN"><PendingRequests /></ProtectedRoute>} />
            <Route path="/warden/report" element={<ProtectedRoute requiredRole="WARDEN"><AttendanceReport /></ProtectedRoute>} />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
      </Router>
    </AuthProvider>
  );
}

export default App;
