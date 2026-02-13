import React, { useState } from 'react';
import api from '../../services/api';
import FormInput from '../../components/FormInput';
import { useNavigate } from 'react-router-dom';

const ApplyOD = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        studentId: '',
        odDate: '',
        purpose: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/od/apply', formData);
            alert('OD Request applied successfully!');
            navigate('/student/history');
        } catch (err) {
            alert('Failed to apply OD: ' + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div className="card shadow p-4" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 className="mb-4 text-center">Apply for On-Duty</h2>
            <form onSubmit={handleSubmit}>
                <FormInput label="Student ID" name="studentId" type="number" value={formData.studentId} onChange={handleChange} required />
                <FormInput label="Date" name="odDate" type="date" value={formData.odDate} onChange={handleChange} required />
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

export default ApplyOD;
