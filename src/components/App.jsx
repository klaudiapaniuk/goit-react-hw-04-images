import React, { Component } from 'react';
import { pixabayAPI } from '../utils/API';
import styles from 'styles.module.css';

import Searchbar from '../components/Searchbar/Searchbar';
import ImageGallery from '../components/ImageGallery/ImageGallery';
import Button from '../components/Button/Button';
import { MoonLoader } from 'react-spinners';
import Modal from '../components/Modal/Modal';

class App extends Component {
  state = {
    query: '',
    page: 1,
    perPage: 12,
    images: [],
    isLoading: false,
    showModal: false,
    selectedImage: '',
    hasMoreImages: false,
  };

  handleSearch = query => {
    this.setState({ query, page: 1, images: [], hasMoreImages: false });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const { query, page, perPage } = this.state;
    this.setState({ isLoading: true });

    pixabayAPI
      .searchImages(query, page, perPage)
      .then(newImages => {
        const hasMoreImages = newImages.length === perPage;
        this.setState(prevState => ({
          images: [...prevState.images, ...newImages],
          hasMoreImages,
        }));
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  handleImageClick = imageUrl => {
    this.setState({ showModal: true, selectedImage: imageUrl });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, selectedImage: '' });
  };

  render() {
    const { images, isLoading, showModal, selectedImage, hasMoreImages } =
      this.state;
    const showLoadMoreButton = images.length > 0 && !isLoading && hasMoreImages;

    return (
      <div className={styles.App}>
        <Searchbar onSearch={this.handleSearch} />
        <ImageGallery images={images} onClickImage={this.handleImageClick} />
        {isLoading && <MoonLoader />}
        {showLoadMoreButton && (
          <Button onClick={this.handleLoadMore}>Load more</Button>
        )}
        {showModal && (
          <Modal imageUrl={selectedImage} onClose={this.handleCloseModal} />
        )}
      </div>
    );
  }
}

export default App;
