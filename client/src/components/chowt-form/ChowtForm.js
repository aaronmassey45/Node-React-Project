import React from 'react';
import PropTypes from 'prop-types';

const ChowtForm = ({ text, sendLocation, handleChange, submitButton }) => (
  <>
    <textarea
      id="text"
      placeholder="Whats happening? Chowt it out!"
      rows="5"
      value={text}
      onChange={handleChange}
    />
    <div className="flex">
      <div className="form-check text-left mb-0">
        <label className="form-check-label">
          <input
            type="checkbox"
            className="form-check-input"
            id="sendLocation"
            checked={sendLocation}
            onChange={handleChange}
          />
          Send Location
        </label>
      </div>
      <span className="right">{text.length} / 300 characters</span>
      {submitButton}
    </div>
  </>
);

ChowtForm.propTypes = {
  text: PropTypes.string.isRequired,
  sendLocation: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  submitButton: PropTypes.element,
};

export default ChowtForm;
