import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import styles from 'styles.module.css';

const ImageGallery = ({ images, onClickImage }) => {
  return (
    <div>
      <ul className={styles.ImageGallery}>
        {images.map((image, index) => (
          <ImageGalleryItem
            key={`${image.id}_${index}`}
            imageUrl={image.webformatURL}
            onClick={() => onClickImage(image.largeImageURL)}
          />
        ))}
      </ul>
    </div>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onClickImage: PropTypes.func.isRequired,
};

export default ImageGallery;
