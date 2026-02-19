import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import authService from '../../services/authService';

const RegisterPage = () => {
    const [form, setForm] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        name: '',
        rollNumber: '',
        department: '',
        year: '',
        roomNumber: '',
        hostelBlock: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (form.password !== form.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (form.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        try {
            const payload = {
                username: form.username,
                password: form.password,
                role: 'STUDENT',
                name: form.name,
                rollNumber: form.rollNumber,
                department: form.department,
                year: form.year,
                roomNumber: form.roomNumber,
                hostelBlock: form.hostelBlock,
            };
            const data = await authService.register(payload);
            login(data);
            navigate('/student/list');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const departments = ['CSE', 'ECE', 'EEE', 'MECH', 'CIVIL', 'IT', 'AIDS', 'AIML'];
    const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
    const blocks = ['A Block', 'B Block', 'C Block', 'D Block'];

    return (
        <div className="row justify-content-center mt-4 mb-5">
            <div className="col-md-7">
                <div className="card shadow border-0 rounded-4">
                    <div className="card-body p-4">
                        <h2 className="text-center fw-bold mb-1 text-primary">Student Registration</h2>
                        <p className="text-center text-muted mb-4">Create your hostel account</p>

                        {error && (
                            <div className="alert alert-danger py-2" role="alert">
                                <i className="bi bi-exclamation-triangle me-2"></i>{error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            {/* Login Credentials */}
                            <h6 className="fw-bold text-secondary mb-3 border-bottom pb-2">
                                <i className="bi bi-lock me-2"></i>Login Credentials
                            </h6>
                            <div className="row mb-3">
                                <div className="col-md-6 mb-3 mb-md-0">
                                    <label className="form-label fw-semibold">Username <span className="text-danger">*</span></label>
                                    <input type="text" className="form-control" name="username"
                                        placeholder="Choose a username" value={form.username}
                                        onChange={handleChange} required />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Password <span className="text-danger">*</span></label>
                                    <input type="password" className="form-control" name="password"
                                        placeholder="Min. 6 characters" value={form.password}
                                        onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="form-label fw-semibold">Confirm Password <span className="text-danger">*</span></label>
                                <input type="password" className="form-control" name="confirmPassword"
                                    placeholder="Re-enter password" value={form.confirmPassword}
                                    onChange={handleChange} required />
                            </div>

                            {/* Student Details */}
                            <h6 className="fw-bold text-secondary mb-3 border-bottom pb-2">
                                <i className="bi bi-person-badge me-2"></i>Student Details
                            </h6>
                            <div className="row mb-3">
                                <div className="col-md-6 mb-3 mb-md-0">
                                    <label className="form-label fw-semibold">Full Name <span className="text-danger">*</span></label>
                                    <input type="text" className="form-control" name="name"
                                        placeholder="Enter your full name" value={form.name}
                                        onChange={handleChange} required />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Roll Number <span className="text-danger">*</span></label>
                                    <input type="text" className="form-control" name="rollNumber"
                                        placeholder="e.g. 22CS001" value={form.rollNumber}
                                        onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6 mb-3 mb-md-0">
                                    <label className="form-label fw-semibold">Department <span className="text-danger">*</span></label>
                                    <select className="form-select" name="department" value={form.department}
                                        onChange={handleChange} required>
                                        <option value="">Select Department</option>
                                        {departments.map(d => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Year <span className="text-danger">*</span></label>
                                    <select className="form-select" name="year" value={form.year}
                                        onChange={handleChange} required>
                                        <option value="">Select Year</option>
                                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-md-6 mb-3 mb-md-0">
                                    <label className="form-label fw-semibold">Room Number <span className="text-danger">*</span></label>
                                    <input type="text" className="form-control" name="roomNumber"
                                        placeholder="e.g. 101" value={form.roomNumber}
                                        onChange={handleChange} required />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Hostel Block <span className="text-danger">*</span></label>
                                    <select className="form-select" name="hostelBlock" value={form.hostelBlock}
                                        onChange={handleChange} required>
                                        <option value="">Select Block</option>
                                        {blocks.map(b => <option key={b} value={b}>{b}</option>)}
                                    </select>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold" disabled={loading}>
                                {loading ? (
                                    <><span className="spinner-border spinner-border-sm me-2"></span>Registering...</>
                                ) : (
                                    <><i className="bi bi-person-plus me-2"></i>Create Account</>
                                )}
                            </button>
                        </form>

                        <p className="text-center mt-3 mb-0 text-muted">
                            Already have an account?{' '}
                            <Link to="/login" className="text-primary fw-semibold">Sign in here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
