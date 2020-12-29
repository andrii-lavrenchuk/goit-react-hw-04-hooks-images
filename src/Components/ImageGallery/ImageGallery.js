import { Component } from 'react';

import LoaderComponent from '../Loader/Loader';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import ErrorView from '../ErrorView/ErrorView';
import Searchbar from '../Searchbar/Searchbar';
import Button from '../Button/Button';
import imagesAPI from '../../services/images-api';
import Title from '../Title/Title';
import s from './ImageGallery.module.css';

export default class ImageGallery extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: '',
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.setState({ status: 'pending' });
      this.fetchImages();
    }
  }

  onChangeQuery = query => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      images: [],
      error: null,
    });
  };

  fetchImages = () => {
    const { currentPage, searchQuery } = this.state;

    const options = { searchQuery, currentPage };

    this.setState({ isLoading: true });

    imagesAPI
      .fetchImages(options)
      .then(images =>
        this.setState(prevState => ({
          images: [...prevState.images, ...images.hits],
          currentPage: prevState.currentPage + 1,
          status: 'resolved',
        })),
      )
      .catch(error => this.setState({ error, status: 'rejected' }));

    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 1000);
  };

  render() {
    const { images, searchQuery, status } = this.state;

    if (status === 'idle') {
      return (
        <>
          <Searchbar onSubmit={this.onChangeQuery} />
          <Title title="Find the best pictures you've ever seen" />
        </>
      );
    }

    if (status === 'pending') {
      return (
        <>
          <Searchbar onSubmit={this.onChangeQuery} />
          <LoaderComponent />
        </>
      );
    }

    if (status === 'rejected' || images.length === 0) {
      return (
        <>
          <Searchbar onSubmit={this.onChangeQuery} />
          <ErrorView
            message={`Cannot find any results of ${searchQuery}, please, change the search text `}
          />
        </>
      );
    }

    if (status === 'resolved') {
      return (
        <>
          <Searchbar onSubmit={this.onChangeQuery} />
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
          {images.length > 0 && <Button onLoadMore={this.fetchImages} />}
        </>
      );
    }
  }
}
