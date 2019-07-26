import React, { Component } from 'react';

import ChowtForm from '../../components/chowt-form/ChowtForm';
import ChowtSubmitButton from '../../components/chowt-submit-button/ChowtSubmitButton';

import './chowt-page.styles.scss';

class ChowtPage extends Component {
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

    sendChowt({ variables });
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
    const { history } = this.props;

    return (
      <div id="chowt-page">
        <div className="actions">
          <div className="actions-container">
            <i
              className="fas fa-arrow-left back-btn"
              onClick={history.goBack}
            />
            <ChowtSubmitButton
              disabled={text.length === 0}
              history={history}
              handleSubmit={this.handleSubmit}
            />
          </div>
        </div>
        <ChowtForm
          text={text}
          sendLocation={sendLocation}
          handleChange={this.handleChange}
        />
      </div>
    );
  }
}

export default ChowtPage;
