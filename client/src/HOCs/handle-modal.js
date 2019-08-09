import React, { Component } from 'react';

const handleModal = WrappedComponent => {
  return class HandleModal extends Component {
    state = {
      showModal: false,
    };

    hide = () => {
      document.body.classList.remove('modal-open');
      this.setState({ showModal: false });
    };

    show = () => {
      document.body.classList.add('modal-open');
      this.setState({ showModal: true });
    };

    render() {
      return (
        <WrappedComponent
          hide={this.hide}
          show={this.show}
          showModal={this.state.showModal}
          {...this.props}
        />
      );
    }
  };
};

export default handleModal;
