import React, { useState } from 'react';
import api from '../../services/api';

const AttendanceReport = () => {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [report, setReport] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchReport = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/warden/attendance-report?date=${date}`);
            setReport(response.data);
        } catch (error) {
            console.error("Error fetching report", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card shadow-sm p-4">
                        <h2 className="mb-4 text-center">Attendance Report</h2>
                        <div className="d-flex justify-content-center gap-3 mb-4" style={{ margin: '0 auto', maxWidth: '400px' }}>
                            <input
                                type="date"
                                className="form-control"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                            <button className="btn btn-primary px-4" onClick={fetchReport}>Get Report</button>
                        </div>

                        {loading ? <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div> :
                            <div className="table-responsive">
                                <table className="table table-hover table-bordered">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Student Name</th>
                                            <th>Roll Number</th>
                                            <th>Block</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {report.length === 0 ? <tr><td colSpan="4" className="text-center text-muted py-4">No records found for this date</td></tr> :
                                            report.map(record => (
                                                <tr key={record.id}>
                                                    <td>{record.student.name}</td>
                                                    <td>{record.student.rollNumber}</td>
                                                    <td>{record.student.hostelBlock}</td>
                                                    <td>
                                                        <span className={`badge bg-${record.status === 'PRESENT' ? 'success' : 'danger'}`}>
                                                            {record.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttendanceReport;
