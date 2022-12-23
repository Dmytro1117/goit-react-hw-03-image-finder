import React, { Component } from 'react';
import { ImGithub } from 'react-icons/im'; 
import './Searchbar.css';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleChange = e => {
    // const { name, value } = e.currentTarget;
    // this.setState({ [name]: value });
    this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      return Notify.warning('Please enter something in the input field');
    }
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <header className="Searchbar">
        <form onSubmit={this.handleSubmit} className="SearchForm">
          <input
            className="SearchForm-input "
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="searchQuery"
            value={this.state.searchQuery}
            onChange={this.handleChange}
          />
           <button type="submit" className="SearchForm-button">
            <span>
              <ImGithub size={30} />
            </span>
          </button>
        </form>
      </header>
    );
  }
}


Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
