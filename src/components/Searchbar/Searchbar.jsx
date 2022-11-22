import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Button,
  SearchbarHeader,
  ButtonLabel,
  SearchForm,
  Input,
} from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const [query, setQueary] = useState('');

  const handleInput = event => {
    const { value } = event.currentTarget;
    setQueary(value);
  };

  const handeSubmit = event => {
    event.preventDefault();
    if (query.trim() === '') {
      toast('Please enter a request');
      return;
    }
    onSubmit(query);
    setQueary('');
  };

  return (
    <SearchbarHeader>
      <SearchForm className="form" onSubmit={handeSubmit}>
        <Button type="submit" className="button">
          <ButtonLabel className="button-label">Go!</ButtonLabel>
        </Button>

        <Input
          onChange={handleInput}
          value={query}
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchbarHeader>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
