// import React, { Component } from 'react';
import {useState} from 'react';
import { ImGithub } from 'react-icons/im'; 
import './Searchbar.css';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default function Searchbar({ onSubmit }) {
const [searchQuery, setSearchQuery] = useState('')

const handleChange = e => {
  setSearchQuery(e.currentTarget.value.toLowerCase());
};

const handleSubmit = (e) => {
  e.preventDefault();
  if (searchQuery.trim() === '') {
    return Notify.warning('Please enter something in the input field');
  }
  onSubmit(searchQuery);
  setSearchQuery('');
};

  return (
  <header className="Searchbar">
  <form onSubmit={handleSubmit} className="SearchForm">
    <input
      className="SearchForm-input "
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
      name="searchQuery"
      value={searchQuery}
      onChange={handleChange}
    />
     <button type="submit" className="SearchForm-button">
      <span>
        <ImGithub size={30} />
      </span>
    </button>
  </form>
</header>)
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
