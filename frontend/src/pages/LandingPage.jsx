import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
    const { isAuthenticated, isStudent, isWarden } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="container py-5 text-center">
            <div className="row justify-content-center py-5 bg-white shadow-sm rounded-4">
                <div className="col-md-8">
                    <h1 className="display-4 fw-bold mb-3 text-primary">MEC Hostel Management System</h1>
                    <p className="lead text-muted mb-5">
                        Streamline your hostel operations with our unified management portal.
                        Manage attendance, leave requests, and student records efficiently.
                    </p>

                    {isAuthenticated ? (
                        <div className="d-flex justify-content-center gap-4 mt-4">
                            {isStudent && (
                                <Link to="/student/list" className="btn btn-primary btn-lg px-5 py-3 rounded-pill shadow-sm">
                                    <i className="bi bi-people me-2"></i>Student Dashboard
                                </Link>
                            )}
                            {isWarden && (
                                <Link to="/warden/pending" className="btn btn-outline-danger btn-lg px-5 py-3 rounded-pill shadow-sm">
                                    <i className="bi bi-shield-check me-2"></i>Warden Dashboard
                                </Link>
                            )}
                        </div>
                    ) : (
                        <div className="d-flex justify-content-center gap-4 mt-4">
                            <Link to="/login" className="btn btn-primary btn-lg px-5 py-3 rounded-pill shadow-sm">
                                <i className="bi bi-box-arrow-in-right me-2"></i>Login
                            </Link>
                            <Link to="/register" className="btn btn-outline-primary btn-lg px-5 py-3 rounded-pill shadow-sm">
                                <i className="bi bi-person-plus me-2"></i>Register as Student
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            <div className="row mt-5 pt-4">
                <div className="col-md-4 mb-4">
                    <div className="card h-100 p-4 shadow-sm border-0">
                        <i className="bi bi-shield-lock fs-1 text-primary mb-3"></i>
                        <h4 className="fw-bold">Secure Access</h4>
                        <p className="text-muted">Role-based login for Students and Wardens with JWT authentication.</p>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card h-100 p-4 shadow-sm border-0">
                        <i className="bi bi-graph-up fs-1 text-success mb-3"></i>
                        <h4 className="fw-bold">Real-time Tracking</h4>
                        <p className="text-muted">Track attendance and leave requests as they happen.</p>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card h-100 p-4 shadow-sm border-0">
                        <i className="bi bi-file-earmark-bar-graph fs-1 text-warning mb-3"></i>
                        <h4 className="fw-bold">Easy Reporting</h4>
                        <p className="text-muted">Generate attendance reports and manage history effortlessly.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
