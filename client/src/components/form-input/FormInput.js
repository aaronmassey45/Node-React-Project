import React from 'react';
import PropTypes from 'prop-types';

const FormInput = ({ label, smallText, ...otherProps }) => {
  return (
    <div className="form-group">
      <label htmlFor={otherProps.id}>{label}</label>
      <input className="form-control" {...otherProps} />
      {smallText && (
        <small className="form-text text-muted text-left flex">
          {smallText}
        </small>
      )}
    </div>
  );
};

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  smallText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.elementType,
    PropTypes.bool,
  ]),
};

export default FormInput;
