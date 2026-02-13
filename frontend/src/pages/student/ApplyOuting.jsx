import React, { useState } from 'react';
import api from '../../services/api';
import FormInput from '../../components/FormInput';
import { useNavigate } from 'react-router-dom';

const ApplyOuting = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        studentId: '',
        date: '',
        outTime: '',
        returnTime: '',
        purpose: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Backend expects time in HH:mm:ss format, HTML input gives HH:mm
            const payload = {
                ...formData,
                outTime: formData.outTime + ':00',
                returnTime: formData.returnTime + ':00'
            };
            await api.post('/outing/apply', payload);
            alert('Outing Request applied successfully!');
            navigate('/student/history');
        } catch (err) {
            alert('Failed to apply Outing: ' + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div className="card shadow p-4" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 className="mb-4 text-center">Apply for Outing</h2>
            <form onSubmit={handleSubmit}>
                <FormInput label="Student ID" name="studentId" type="number" value={formData.studentId} onChange={handleChange} required />
                <FormInput label="Date" name="date" type="date" value={formData.date} onChange={handleChange} required />
                <div className="row">
                    <div className="col-md-6">
                        <FormInput label="Out Time" name="outTime" type="time" value={formData.outTime} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                        <FormInput label="Return Time" name="returnTime" type="time" value={formData.returnTime} onChange={handleChange} required />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Purpose</label>
                    <textarea
                        className="form-control"
                        name="purpose"
                        rows="3"
                        value={formData.purpose}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100">Submit Request</button>
            </form>
        </div>
    );
};

export default ApplyOuting;
