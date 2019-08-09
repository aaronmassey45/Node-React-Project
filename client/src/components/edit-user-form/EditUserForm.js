import React, { memo } from 'react';
import PropTypes from 'prop-types';

import InputField from './InputField';

import FIELDS from './form-fields';

const EditUserForm = ({ handleChange, values, errors }) => (
  <form id="edit-user-form" onSubmit={e => e.preventDefault()}>
    {FIELDS.map(fieldProps => (
      <InputField
        key={fieldProps.name}
        {...fieldProps}
        handleChange={handleChange}
        value={values[fieldProps.name]}
        error={errors[fieldProps.name]}
      />
    ))}
  </form>
);

EditUserForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

export default memo(EditUserForm);
