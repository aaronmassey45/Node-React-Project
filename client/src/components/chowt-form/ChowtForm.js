import React from 'react';

import './chowt-form.styles.scss';

const ChowtForm = ({ text, sendLocation, handleChange }) => {
  return (
    <div id="chowt-form">
      <textarea
        id="text"
        placeholder="Whats happening? Chowt it out!"
        rows="5"
        value={text}
        onChange={handleChange}
      />
      <div className="d-flex">
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
        <span className="align-right">{text.length} / 300 characters</span>
      </div>
    </div>
  );
};

export default ChowtForm;
