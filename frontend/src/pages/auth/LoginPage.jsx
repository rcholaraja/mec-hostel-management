import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import authService from '../../services/authService';

const LoginPage = () => {
    const [activeTab, setActiveTab] = useState('student');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const data = await authService.login(username, password);
            // Validate role matches selected tab
            const expectedRole = activeTab === 'student' ? 'STUDENT' : 'WARDEN';
            if (data.role !== expectedRole) {
                setError(`This account is not a ${activeTab} account. Please use the correct login tab.`);
                setLoading(false);
                return;
            }
            login(data);
            navigate(data.role === 'WARDEN' ? '/warden/pending' : '/student/list');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="row justify-content-center mt-4">
            <div className="col-md-5">
                <div className="card shadow border-0 rounded-4">
                    <div className="card-body p-4">
                        <h2 className="text-center fw-bold mb-1 text-primary">Welcome Back</h2>
                        <p className="text-center text-muted mb-4">Sign in to your account</p>

                        {/* Tabs */}
                        <ul className="nav nav-pills nav-fill mb-4">
                            <li className="nav-item">
                                <button
                                    className={`nav-link ${activeTab === 'student' ? 'active' : ''}`}
                                    onClick={() => { setActiveTab('student'); setError(''); }}
                                >
                                    <i className="bi bi-person me-1"></i> Student
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className={`nav-link ${activeTab === 'warden' ? 'active' : ''}`}
                                    onClick={() => { setActiveTab('warden'); setError(''); }}
                                >
                                    <i className="bi bi-shield-check me-1"></i> Warden
                                </button>
                            </li>
                        </ul>

                        {error && (
                            <div className="alert alert-danger py-2" role="alert">
                                <i className="bi bi-exclamation-triangle me-2"></i>{error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label fw-semibold">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder={activeTab === 'student' ? 'Enter your username' : 'Warden username'}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="form-label fw-semibold">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary w-100 py-2 fw-semibold"
                                disabled={loading}
                            >
                                {loading ? (
                                    <><span className="spinner-border spinner-border-sm me-2"></span>Signing in...</>
                                ) : (
                                    <><i className="bi bi-box-arrow-in-right me-2"></i>Sign In</>
                                )}
                            </button>
                        </form>

                        {activeTab === 'student' && (
                            <p className="text-center mt-3 mb-0 text-muted">
                                Don't have an account?{' '}
                                <Link to="/register" className="text-primary fw-semibold">Register here</Link>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
