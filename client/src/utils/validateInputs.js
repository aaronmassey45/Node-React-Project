const validateInputs = values => {
  const errors = {};

  Object.keys(values).forEach(key => {
    if (!values[key]) {
      errors[key] =
        key === 'profileImg' ? 'Enter your image link' : `Enter your ${key}`;
    }
  });

  return errors;
};

export default validateInputs;
