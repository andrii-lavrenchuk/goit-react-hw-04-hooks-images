import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({
  webformatURL,
  tags,
  largeImageURL,
}) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <li className={s.imageGalleryItem}>
      <img
        className={s.imageGalleryItemImage}
        onClick={toggleModal}
        src={webformatURL}
        alt={tags}
      />
      {showModal && (
        <Modal
          onClose={toggleModal}
          largeImageURL={largeImageURL}
          tags={tags}
        />
      )}
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
