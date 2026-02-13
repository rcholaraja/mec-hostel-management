import React from 'react';

const FormInput = ({ label, type = 'text', name, value, onChange, placeholder, required = false, options = null }) => {
    return (
        <div className="mb-3">
            <label className="form-label">{label}</label>
            {type === 'select' ? (
                <select
                    className="form-select"
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                >
                    <option value="">Select {label}</option>
                    {options && options.map((opt, idx) => (
                        <option key={idx} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    type={type}
                    className="form-control"
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                />
            )}
        </div>
    );
};

export default FormInput;
