import React from 'react';
import PropTypes from 'prop-types';

const FormInput = ({ label, children, ...otherProps }) => {
  return (
    <div className="form-group">
      <label htmlFor={otherProps.id}>{label}</label>
      <input className="form-control" {...otherProps} />
      {children}
    </div>
  );
};

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.element,
};

export default FormInput;
