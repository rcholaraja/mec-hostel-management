import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="container py-5 text-center">
            <div className="row justify-content-center py-5 bg-white shadow-sm rounded-4">
                <div className="col-md-8">
                    <h1 className="display-4 fw-bold mb-3 text-primary">MEC Hostel Management System</h1>
                    <p className="lead text-muted mb-5">
                        Streamline your hostel operations with our unified management portal.
                        Manage attendance, leave requests, and student records efficiently.
                    </p>
                    <div className="d-flex justify-content-center gap-4 mt-4">
                        <Link to="/student/list" className="btn btn-primary btn-lg px-5 py-3 rounded-pill shadow-sm">
                            <i className="bi bi-people me-2"></i> Student Module
                        </Link>
                        <Link to="/warden/pending" className="btn btn-outline-danger btn-lg px-5 py-3 rounded-pill shadow-sm">
                            <i className="bi bi-shield-check me-2"></i> Warden Module
                        </Link>
                    </div>
                </div>
            </div>

            <div className="row mt-5 pt-4">
                <div className="col-md-4 mb-4">
                    <div className="card h-100 p-4 shadow-sm border-0">
                        <h4 className="fw-bold">Fast & Secure</h4>
                        <p className="text-muted">High-performance management with secure data handling.</p>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card h-100 p-4 shadow-sm border-0">
                        <h4 className="fw-bold">Real-time Tracking</h4>
                        <p className="text-muted">Track attendance and leave requests as they happen.</p>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card h-100 p-4 shadow-sm border-0">
                        <h4 className="fw-bold">Easy Reporting</h4>
                        <p className="text-muted">Generate attendance reports and manage history effortlessly.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
