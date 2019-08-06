import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ChowtForm from '../../components/chowt-form/ChowtForm';
import ChowtSubmitButton from '../../components/chowt-submit-button/ChowtSubmitButton';

import './chowt-form.styles.scss';

class ChowtFormContainer extends Component {
  state = {
    text: '',
    sendLocation: false,
  };

  handleSubmit = async sendChowt => {
    const { text, sendLocation } = this.state;
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
      this.setState({ text: '', sendLocation: false });
    } catch (err) {
      console.log(err);
    }
  };

  handleChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;

    if (target.type === 'textarea' && value.length >= 301) {
      return;
    }

    this.setState({ [target.id]: value });
  };

  render() {
    const { text, sendLocation } = this.state;
    const { showHeader = false, goBack } = this.props;

    const submitButton = showHeader ? null : (
      <span className="right">
        <ChowtSubmitButton
          _onCompleted={() => {}}
          disabled={text.length === 0}
          handleSubmit={this.handleSubmit}
        />
      </span>
    );

    return (
      <div id="chowt-form">
        {showHeader && (
          <div className="actions">
            <div className="actions-container">
              <i className="fas fa-arrow-left back-btn" onClick={goBack} />
              <ChowtSubmitButton
                disabled={text.length === 0}
                _onCompleted={goBack}
                handleSubmit={this.handleSubmit}
              />
            </div>
          </div>
        )}
        <ChowtForm
          text={text}
          sendLocation={sendLocation}
          handleChange={this.handleChange}
          submitButton={submitButton}
        />
      </div>
    );
  }
}

ChowtFormContainer.propTypes = {
  goBack: PropTypes.func,
  showHeader: PropTypes.bool,
};

export default ChowtFormContainer;
