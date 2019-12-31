import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ChowtForm from 'components/chowt-form/ChowtForm';
import ChowtSubmitButton from 'components/chowt-submit-button/ChowtSubmitButton';

import './chowt-form.styles.scss';

const ChowtFormContainer = ({ goBack, showHeader }) => {
  const [text, setText] = useState('');
  const [sendLocation, setSendLocation] = useState(false);

  const handleSubmit = async sendChowt => {
    const variables = { text };

    if (sendLocation) {
      if (navigator.geolocation) {
        await new Promise((res, rej) => {
          navigator.geolocation.getCurrentPosition(res, rej, { timeout: 5000 });
        })
          .then(pos => {
            variables.location = {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            };
          })
          .catch(err => console.log(err));
      } else {
        //UPDATE ERRORS TO HANDLE WITH THE UI
        alert('navigator is not supported');
      }
    }

    try {
      sendChowt({ variables });
      setText('');
      setSendLocation(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = ({ target: { type, checked, value } }) => {
    if (type === 'textarea' && value.length >= 301) {
      return;
    }

    type === 'checkbox' ? setSendLocation(checked) : setText(value);
  };

  const SubmitButton = !showHeader ? (
    <span className="right">
      <ChowtSubmitButton
        _onCompleted={() => {}}
        disabled={text.length === 0}
        handleSubmit={handleSubmit}
      />
    </span>
  ) : null;

  return (
    <div id="chowt-form">
      {showHeader && (
        <div className="actions">
          <div className="actions-container">
            <i className="fas fa-arrow-left back-btn" onClick={goBack} />
            <ChowtSubmitButton
              disabled={text.length === 0}
              _onCompleted={goBack}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      )}
      <ChowtForm
        text={text}
        sendLocation={sendLocation}
        handleChange={handleChange}
        submitButton={!showHeader ? SubmitButton : null}
      />
    </div>
  );
};

ChowtFormContainer.propTypes = {
  goBack: PropTypes.func,
  showHeader: PropTypes.bool,
};

export default ChowtFormContainer;
