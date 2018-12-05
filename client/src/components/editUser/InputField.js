import React from 'react';

const InputField = ({ error, handleChange, label, name, type, value }) => {
  if (type === 'checkbox') {
    return (
      <div className="form-group form-check pl-0">
        <label className="form-check-label">
          {label}
          <input
            type="checkbox"
            className="form-check-input ml-2"
            name={name}
            onChange={handleChange}
            checked={value}
          />
        </label>
      </div>
    );
  }

  return (
    <div className="form-group row">
      <label htmlFor={label} className="col-sm-2 col-form-label">
        {label}
      </label>
      <div className="col-sm-10 my-auto">
        <input
          type={type}
          className="form-control"
          autoComplete={name}
          name={name}
          onChange={handleChange}
          value={value}
        />
        <small className="text-danger">{error}</small>
      </div>
    </div>
  );
};

export default InputField;
