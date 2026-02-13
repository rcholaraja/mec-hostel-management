import React, { useState } from 'react';
import api from '../../services/api';
import FormInput from '../../components/FormInput';
import { useNavigate } from 'react-router-dom';

const MarkAttendance = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        studentId: '',
        status: 'PRESENT'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/attendance/mark', formData);
            alert('Attendance marked successfully!');
            navigate('/student/history'); // Redirect to history to confirm
        } catch (err) {
            alert('Failed to mark attendance: ' + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div className="card shadow p-4" style={{ maxWidth: '500px', margin: '0 auto' }}>
            <h2 className="mb-4 text-center">Mark Attendance</h2>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Student ID"
                    name="studentId"
                    type="number"
                    value={formData.studentId}
                    onChange={handleChange}
                    required
                />

                <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                        className="form-select"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="PRESENT">PRESENT</option>
                        <option value="ABSENT">ABSENT</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary w-100">Submit</button>
            </form>
        </div>
    );
};

export default MarkAttendance;
