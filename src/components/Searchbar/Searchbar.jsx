import { Component } from 'react';
import PropTypes from 'prop-types';
import { GoSearch } from 'react-icons/go';
import {
  SearchBarHeader,
  SearchForm,
  SearchFormBtn,
  SearchFormBtnLabel,
  SearchFormInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleInputChange = e => {
    this.setState({ query: e.target.value });
  };

  handleSearchSubmit = e => {
    e.preventDefault();
    if (!this.state.query.trim()) {
      return;
    }
    this.props.onSubmit(this.state.query);
  };

  render() {
    const { query } = this.state;

    return (
      <SearchBarHeader>
        <SearchForm onSubmit={this.handleSearchSubmit}>
          <SearchFormBtn type="submit">
            <GoSearch size="20" />
            <SearchFormBtnLabel>Search</SearchFormBtnLabel>
          </SearchFormBtn>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={this.handleInputChange}
          />
        </SearchForm>
      </SearchBarHeader>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
