import React, { useState, useEffect } from 'react';
import { pixabayAPI } from '../utils/API';
import styles from 'styles.module.css';

import Searchbar from '../components/Searchbar/Searchbar';
import ImageGallery from '../components/ImageGallery/ImageGallery';
import Button from '../components/Button/Button';
import { MoonLoader } from 'react-spinners';
import Modal from '../components/Modal/Modal';

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [hasMoreImages, setHasMoreImages] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const perPage = 12;

  const handleSearch = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
    setHasMoreImages(false);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    const fetchImages = () => {
      setIsLoading(true);
      pixabayAPI
        .searchImages(query, page, perPage)
        .then(newImages => {
          if (newImages.length === 0 && query.trim() !== '') {
            return;
          }
          const hasMoreImages = newImages.length === perPage;
          setImages(prevImages => [...prevImages, ...newImages]);
          setHasMoreImages(hasMoreImages);
        })
        .catch(error => {
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    fetchImages();
  }, [query, page, perPage]);

  const handleImageClick = imageUrl => {
    setShowModal(true);
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage('');
  };

  const showLoadMoreButton = images.length > 0 && !isLoading && hasMoreImages;

  return (
    <div className={styles.App}>
      <Searchbar onSearch={handleSearch} />
      <ImageGallery images={images} onClickImage={handleImageClick} />
      {isLoading && <MoonLoader />}
      {showLoadMoreButton && (
        <Button onClick={handleLoadMore}>Load more</Button>
      )}
      {showModal && (
        <Modal imageUrl={selectedImage} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;
