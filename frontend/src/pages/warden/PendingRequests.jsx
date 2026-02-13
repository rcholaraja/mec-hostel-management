import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const PendingRequests = () => {
    const [requests, setRequests] = useState({ leaveRequests: [], odRequests: [], outingRequests: [] });
    const [loading, setLoading] = useState(true);

    const fetchRequests = async () => {
        try {
            const response = await api.get('/warden/pending-requests');
            setRequests(response.data);
        } catch (error) {
            console.error("Error fetching requests", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleAction = async (type, id, action) => {
        try {
            await api.put(`/warden/${type}/${id}/${action}`);
            fetchRequests(); // Refresh list
        } catch (error) {
            alert("Action failed");
        }
    };

    if (loading) return <div>Loading...</div>;

    const renderTable = (title, data, type) => (
        <div className="mb-5">
            <h4>{title}</h4>
            {data.length === 0 ? <p className="text-muted">No pending requests</p> :
                <table className="table table-bordered">
                    <thead className="table-light">
                        <tr>
                            <th>Student</th>
                            <th>Details</th>
                            <th>Reason</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(req => (
                            <tr key={req.id}>
                                <td>{req.student.name} ({req.student.rollNumber})</td>
                                <td>
                                    {req.fromDate && `From: ${req.fromDate} To: ${req.toDate}`}
                                    {req.odDate && `Date: ${req.odDate}`}
                                    {req.date && `Date: ${req.date} (${req.outTime} - ${req.returnTime})`}
                                </td>
                                <td>{req.reason || req.purpose}</td>
                                <td>
                                    <button className="btn btn-sm btn-success me-2" onClick={() => handleAction(type, req.id, 'approve')}>Approve</button>
                                    <button className="btn btn-sm btn-danger" onClick={() => handleAction(type, req.id, 'reject')}>Reject</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </div>
    );

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card shadow-sm p-4">
                        <h2 className="mb-4 text-center">Pending Requests Dashboard</h2>
                        {renderTable('Leave Requests', requests.leaveRequests, 'leave')}
                        {renderTable('On-Duty Requests', requests.odRequests, 'od')}
                        {renderTable('Outing Requests', requests.outingRequests, 'outing')}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PendingRequests;
