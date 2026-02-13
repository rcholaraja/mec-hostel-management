import React from 'react';
import Navbar from '../components/Navbar';

const MainLayout = ({ children }) => {
    return (
        <div className="d-flex flex-column min-vh-100 bg-light">
            <Navbar />
            <div className="container mt-5 flex-grow-1">
                <div className="row justify-content-center">
                    <div className="col-12">
                        {children}
                    </div>
                </div>
            </div>
            <footer className="bg-dark text-white text-center py-3 mt-auto">
                <small>Hostel Management System &copy; 2026</small>
            </footer>
        </div>
    );
};

export default MainLayout;
