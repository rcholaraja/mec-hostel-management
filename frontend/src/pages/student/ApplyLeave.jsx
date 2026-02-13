import React, { useState } from 'react';
import api from '../../services/api';
import FormInput from '../../components/FormInput';
import { useNavigate } from 'react-router-dom';

const ApplyLeave = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        studentId: '',
        fromDate: '',
        toDate: '',
        reason: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/leave/apply', formData);
            alert('Leave applied successfully!');
            navigate('/student/history');
        } catch (err) {
            alert('Failed to apply leave: ' + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div className="card shadow p-4" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 className="mb-4 text-center">Apply for Leave</h2>
            <form onSubmit={handleSubmit}>
                <FormInput label="Student ID" name="studentId" type="number" value={formData.studentId} onChange={handleChange} required />
                <div className="row">
                    <div className="col-md-6">
                        <FormInput label="From Date" name="fromDate" type="date" value={formData.fromDate} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                        <FormInput label="To Date" name="toDate" type="date" value={formData.toDate} onChange={handleChange} required />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Reason</label>
                    <textarea
                        className="form-control"
                        name="reason"
                        rows="3"
                        value={formData.reason}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100">Submit Request</button>
            </form>
        </div>
    );
};

export default ApplyLeave;
