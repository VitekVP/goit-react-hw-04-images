import { useState } from 'react';
import PropTypes from 'prop-types';
// import { toast } from 'react-toastify';
import { FcSearch } from 'react-icons/fc';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = event => {
    const { value } = event.target;
    setQuery(value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    // if (query.trim() === '') {
    //   toast.warn(`Please enter your request!`);
    //   return;
    // }

    onSubmit(query);

    // setQuery('');
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormInput
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleInputChange}
        />

        <SearchFormButton type="submit">
          <FcSearch style={{ width: 30, height: 30 }} />
        </SearchFormButton>
      </SearchForm>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
