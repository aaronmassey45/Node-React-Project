import React, { Component } from 'react';

import handleModal from './handle-modal';

const addAlertProps = WrappedComponent => {
  class AlertProps extends Component {
    state = {
      alert: {
        bg: '',
        msg: '',
      },
    };

    clearAlert = () => {
      this.setState({
        alert: {
          bg: '',
          msg: '',
        },
      });
    };

    updateAlert = ({ bg, msg }) => {
      this.setState({
        alert: { bg, msg },
      });
    };

    render() {
      return (
        <WrappedComponent
          clearAlert={this.clearAlert}
          updateAlert={this.updateAlert}
          alert={this.state.alert}
          {...this.props}
        />
      );
    }
  }

  return handleModal(AlertProps);
};

export default addAlertProps;
