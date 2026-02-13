import React, { useState } from 'react';
import api from '../../services/api';
import FormInput from '../../components/FormInput';

const StudentHistory = () => {
    const [studentId, setStudentId] = useState('');
    const [history, setHistory] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchHistory = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setHistory(null);
        try {
            const response = await api.get(`/student/${studentId}/history`);
            setHistory(response.data);
        } catch (err) {
            setError('Student not found or no history available.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-sm mb-4">
                        <div className="card-body">
                            <h2 className="mb-4 text-center">My History</h2>
                            <p className="text-muted text-center mb-4">Enter your Student ID to view your attendance and leave history.</p>

                            <form onSubmit={fetchHistory} className="d-flex gap-2 justify-content-center mb-3">
                                <div style={{ minWidth: '200px' }}>
                                    <FormInput
                                        name="studentId"
                                        type="number"
                                        value={studentId}
                                        onChange={(e) => setStudentId(e.target.value)}
                                        placeholder="Student ID"
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary" style={{ height: 'fit-content', marginTop: '32px' }}>Fetch History</button>
                            </form>
                        </div>
                    </div>

                    {loading && <div className="text-center"><div className="spinner-border text-primary" role="status"></div></div>}
                    {error && <div className="alert alert-danger text-center">{error}</div>}

                    {history && (
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h4 className="card-title mb-3">Leave Requests</h4>
                                <div className="table-responsive">
                                    <table className="table table-hover table-bordered mb-4">
                                        <thead className="table-light">
                                            <tr><th>From</th><th>To</th><th>Reason</th><th>Status</th></tr>
                                        </thead>
                                        <tbody>
                                            {history.leaveRequests.length === 0 ? <tr><td colSpan="4" className="text-center">No leave requests found.</td></tr> :
                                                history.leaveRequests.map(req => (
                                                    <tr key={req.id}>
                                                        <td>{req.fromDate}</td>
                                                        <td>{req.toDate}</td>
                                                        <td>{req.reason}</td>
                                                        <td><span className={`badge bg-${getStatusColor(req.status)}`}>{req.status}</span></td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>

                                <h4 className="card-title mb-3">On-Duty Requests</h4>
                                <div className="table-responsive">
                                    <table className="table table-hover table-bordered mb-4">
                                        <thead className="table-light">
                                            <tr><th>Date</th><th>Purpose</th><th>Status</th></tr>
                                        </thead>
                                        <tbody>
                                            {history.odRequests.length === 0 ? <tr><td colSpan="3" className="text-center">No OD requests found.</td></tr> :
                                                history.odRequests.map(req => (
                                                    <tr key={req.id}>
                                                        <td>{req.odDate}</td>
                                                        <td>{req.purpose}</td>
                                                        <td><span className={`badge bg-${getStatusColor(req.status)}`}>{req.status}</span></td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>

                                <h4 className="card-title mb-3">Outing Requests</h4>
                                <div className="table-responsive">
                                    <table className="table table-hover table-bordered mb-4">
                                        <thead className="table-light">
                                            <tr><th>Date</th><th>Out Time</th><th>Return Time</th><th>Status</th></tr>
                                        </thead>
                                        <tbody>
                                            {history.outingRequests.length === 0 ? <tr><td colSpan="4" className="text-center">No outing requests found.</td></tr> :
                                                history.outingRequests.map(req => (
                                                    <tr key={req.id}>
                                                        <td>{req.date}</td>
                                                        <td>{req.outTime}</td>
                                                        <td>{req.returnTime}</td>
                                                        <td><span className={`badge bg-${getStatusColor(req.status)}`}>{req.status}</span></td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>

                                <h4 className="card-title mb-3">Attendance History</h4>
                                <div className="table-responsive">
                                    <table className="table table-hover table-bordered">
                                        <thead className="table-light">
                                            <tr><th>Date</th><th>Status</th></tr>
                                        </thead>
                                        <tbody>
                                            {history.attendanceRecords.length === 0 ? <tr><td colSpan="2" className="text-center">No attendance records found.</td></tr> :
                                                history.attendanceRecords.map(req => (
                                                    <tr key={req.id}>
                                                        <td>{req.date}</td>
                                                        <td>{req.status}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const getStatusColor = (status) => {
    switch (status) {
        case 'APPROVED': return 'success';
        case 'REJECTED': return 'danger';
        case 'PENDING': return 'warning';
        default: return 'secondary';
    }
};

export default StudentHistory;
