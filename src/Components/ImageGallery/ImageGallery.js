import { useState, useEffect } from 'react';

import LoaderComponent from '../Loader/Loader';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import ErrorView from '../ErrorView/ErrorView';
import Searchbar from '../Searchbar/Searchbar';
import Button from '../Button/Button';
import imagesAPI from '../../services/images-api';
import Title from '../Title/Title';
import s from './ImageGallery.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function ImageGallery() {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    setStatus(Status.PENDING);

    imagesAPI
      .fetchImages({ searchQuery, currentPage })
      .then(images => {
        setImages(prevImages => [...prevImages, ...images.hits]);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [searchQuery, currentPage]);

  const onChangeQuery = query => {
    setSearchQuery(query);
    setCurrentPage(1);
    setImages([]);
    setError(null);
  };

  const onLoadMore = () => {
    setCurrentPage(currentPage + 1);
    scrollPage();
  };

  const scrollPage = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 1000);
  };

  if (status === Status.IDLE) {
    return (
      <>
        <Searchbar onSubmit={onChangeQuery} />
        <Title title="Find the best pictures you've ever seen" />
      </>
    );
  }

  if (status === Status.PENDING) {
    return (
      <>
        <Searchbar onSubmit={onChangeQuery} />
        <LoaderComponent />
      </>
    );
  }

  if (status === Status.REJECTED || images.length === 0) {
    return (
      <>
        <Searchbar onSubmit={onChangeQuery} />
        <ErrorView
          message={`Cannot find any results of ${searchQuery}, please, change the search text `}
        />
      </>
    );
  }

  if (status === Status.RESOLVED) {
    return (
      <>
        <Searchbar onSubmit={onChangeQuery} />
        <ul className={s.imageGallery}>
          {images.map(({ id, webformatURL, tags, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              tags={tags}
              largeImageURL={largeImageURL}
            />
          ))}
        </ul>
        {images.length > 0 && <Button onLoadMore={onLoadMore} />}
      </>
    );
  }
}
