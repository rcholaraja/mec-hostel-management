import React, { useState } from 'react';
import api from '../../services/api';
import FormInput from '../../components/FormInput';
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        rollNumber: '',
        department: '',
        year: '',
        roomNumber: '',
        hostelBlock: ''
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/students', formData);
            alert('Student added successfully!');
            navigate('/student/list');
        } catch (err) {
            setError('Failed to add student. Please try again.');
        }
    };

    return (
        <div className="card shadow p-4" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 className="mb-4">Add Student</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <FormInput label="Name" name="name" value={formData.name} onChange={handleChange} required />
                <FormInput label="Roll Number" name="rollNumber" value={formData.rollNumber} onChange={handleChange} required />
                <FormInput label="Department" name="department" value={formData.department} onChange={handleChange} required />
                <FormInput label="Year" name="year" value={formData.year} onChange={handleChange} required />
                <FormInput label="Room Number" name="roomNumber" value={formData.roomNumber} onChange={handleChange} required />
                <FormInput label="Hostel Block" name="hostelBlock" value={formData.hostelBlock} onChange={handleChange} required />
                <button type="submit" className="btn btn-primary w-100">Register Student</button>
            </form>
        </div>
    );
};

export default AddStudent;
