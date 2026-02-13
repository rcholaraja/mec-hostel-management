import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">MEC Hostel Management</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                                Student
                            </a>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/student/add">Add Student</Link></li>
                                <li><Link className="dropdown-item" to="/student/list">View Students</Link></li>
                                <li><Link className="dropdown-item" to="/student/attendance">Mark Attendance</Link></li>
                                <li><Link className="dropdown-item" to="/student/leave">Apply Leave</Link></li>
                                <li><Link className="dropdown-item" to="/student/od">Apply OD</Link></li>
                                <li><Link className="dropdown-item" to="/student/outing">Apply Outing</Link></li>
                                <li><Link className="dropdown-item" to="/student/history">My History</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                                Warden
                            </a>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/warden/pending">Pending Requests</Link></li>
                                <li><Link className="dropdown-item" to="/warden/report">Attendance Report</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
