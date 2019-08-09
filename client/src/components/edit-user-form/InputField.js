import React, { memo } from 'react';
import PropTypes from 'prop-types';

const InputField = ({
  error,
  handleChange,
  label,
  name,
  type,
  value,
  required,
}) => {
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
          required={required || false}
        />
        <small className="text-danger">{error}</small>
      </div>
    </div>
  );
};

InputField.propTypes = {
  error: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

export default memo(InputField);
