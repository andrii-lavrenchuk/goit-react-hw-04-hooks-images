import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import s from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
  state = {
    showModal: false,
    largeImageURL: '',
  };

  static propTypes = {
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onOpenModal = e => {
    this.setState({ largeImageURL: e.target.dataset.source });
    this.toggleModal();
  };

  render() {
    const { webformatURL, tags, largeImageURL } = this.props;
    const { showModal } = this.state;

    return (
      <li className={s.imageGalleryItem}>
        <img
          className={s.imageGalleryItemImage}
          onClick={this.toggleModal}
          src={webformatURL}
          alt={tags}
        />
        {showModal && (
          <Modal
            onClose={this.toggleModal}
            largeImageURL={largeImageURL}
            tags={tags}
          />
        )}
      </li>
    );
  }
}
