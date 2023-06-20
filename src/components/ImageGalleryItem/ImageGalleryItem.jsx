import React from 'react';
import PropTypes from 'prop-types';
import styles from 'styles.module.css';

const ImageGalleryItem = ({ imageUrl, onClick }) => {
  return (
    <li className={styles.ImageGalleryItem}>
      <img
        className={styles.ImageGalleryItemImage}
        src={imageUrl}
        alt=""
        onClick={onClick}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
