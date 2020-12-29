import { Component } from 'react';
import PropTypes from 'prop-types';

import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  static propTypes = {
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleEscKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscKeydown);
  }

  handleEscKeydown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImageURL, tags } = this.props;

    return createPortal(
      <div className={s.overlay} onClick={this.handleBackdropClick}>
        <div className={s.modal}>
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>,
      modalRoot,
    );
  }
}
