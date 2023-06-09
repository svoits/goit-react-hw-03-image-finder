import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ModalDiv, Overlay } from './Modal.styled';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';

const modalRoot = document.querySelector('#modal');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    disableBodyScroll('body');
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    clearAllBodyScrollLocks();
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') this.props.onClose();
    enableBodyScroll('body');
  };

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) this.props.onClose();
    enableBodyScroll('body');
  };

  render() {
    const { largeImageURL, tags } = this.props;

    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <ModalDiv>
          <img src={largeImageURL} alt={tags} />
        </ModalDiv>
      </Overlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
