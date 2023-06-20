import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from 'styles.module.css';

const Searchbar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (searchQuery.trim() !== '') {
      onSearch(searchQuery);
    }
  };

  return (
    <header>
      <form className={styles.Searchbar} onSubmit={handleSubmit}>
        <label className={styles.SearchForm}>
          <button className={styles.SearchFormButton} type="submit">
            Search
          </button>
          <input
            className={styles.SearchFormInput}
            type="text"
            value={searchQuery}
            onChange={handleChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </label>
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Searchbar;
