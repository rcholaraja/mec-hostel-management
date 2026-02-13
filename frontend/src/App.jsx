import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import MainLayout from './layouts/MainLayout';
import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFound';

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
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          {/* Student Routes */}
          <Route path="/student/add" element={<AddStudent />} />
          <Route path="/student/list" element={<StudentList />} />
          <Route path="/student/attendance" element={<MarkAttendance />} />
          <Route path="/student/leave" element={<ApplyLeave />} />
          <Route path="/student/od" element={<ApplyOD />} />
          <Route path="/student/outing" element={<ApplyOuting />} />
          <Route path="/student/history" element={<StudentHistory />} />

          {/* Warden Routes */}
          <Route path="/warden/pending" element={<PendingRequests />} />
          <Route path="/warden/report" element={<AttendanceReport />} />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
