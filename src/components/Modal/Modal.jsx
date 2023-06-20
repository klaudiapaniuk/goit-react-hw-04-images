import React, { Component } from 'react';
import styles from 'styles.module.css';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = 'hidden';
  }

  handleKeyDown = event => {
    if (event.key === 'Escape') {
      this.props.onClose();
    }
  };

  handleClick = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { imageUrl } = this.props;

    return (
      <div className={styles.Overlay} onClick={this.handleClick}>
        <div className={styles.Modal}>
          <img src={imageUrl} alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;
