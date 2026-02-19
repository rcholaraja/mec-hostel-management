import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { isAuthenticated, isStudent, isWarden, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/">MEC Hostel Management</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        {isStudent && (
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                                    <i className="bi bi-person me-1"></i>Student
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/student/list"><i className="bi bi-people me-2"></i>View Students</Link></li>
                                    <li><Link className="dropdown-item" to="/student/attendance"><i className="bi bi-calendar-check me-2"></i>Mark Attendance</Link></li>
                                    <li><Link className="dropdown-item" to="/student/leave"><i className="bi bi-calendar-x me-2"></i>Apply Leave</Link></li>
                                    <li><Link className="dropdown-item" to="/student/od"><i className="bi bi-briefcase me-2"></i>Apply OD</Link></li>
                                    <li><Link className="dropdown-item" to="/student/outing"><i className="bi bi-door-open me-2"></i>Apply Outing</Link></li>
                                    <li><Link className="dropdown-item" to="/student/history"><i className="bi bi-clock-history me-2"></i>My History</Link></li>
                                </ul>
                            </li>
                        )}
                        {isWarden && (
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                                    <i className="bi bi-shield-check me-1"></i>Warden
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/warden/pending"><i className="bi bi-hourglass-split me-2"></i>Pending Requests</Link></li>
                                    <li><Link className="dropdown-item" to="/warden/report"><i className="bi bi-bar-chart me-2"></i>Attendance Report</Link></li>
                                </ul>
                            </li>
                        )}
                    </ul>

                    {/* Right side: user info or login */}
                    <ul className="navbar-nav ms-auto align-items-center">
                        {isAuthenticated ? (
                            <>
                                <li className="nav-item me-2">
                                    <span className="navbar-text text-light">
                                        <i className="bi bi-person-circle me-1"></i>
                                        <span className="fw-semibold">{user?.username}</span>
                                        <span className="badge bg-secondary ms-2">{user?.role}</span>
                                    </span>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                                        <i className="bi bi-box-arrow-right me-1"></i>Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item me-2">
                                    <Link className="btn btn-outline-light btn-sm" to="/login">
                                        <i className="bi bi-box-arrow-in-right me-1"></i>Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="btn btn-primary btn-sm" to="/register">
                                        <i className="bi bi-person-plus me-1"></i>Register
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
