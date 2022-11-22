import React, { Component } from 'react';
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

class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };
  state = {
    query: '',
  };

  handleInput = event => {
    const { value } = event.currentTarget;
    this.setState({
      query: value,
    });
  };

  handeSubmit = event => {
    // this.props.onSubmit
    event.preventDefault();
    if (this.state.query.trim() === '') {
      toast('Please enter a request');
      return;
    }
    this.props.onSubmit(this.state.query);
    this.reset();
  };

  reset = () => {
    this.setState({
      query: '',
    });
  };

  render() {
    return (
      <SearchbarHeader>
        <SearchForm className="form" onSubmit={this.handeSubmit}>
          <Button type="submit" className="button">
            <ButtonLabel className="button-label">Go!</ButtonLabel>
          </Button>

          <Input
            onChange={this.handleInput}
            value={this.state.query}
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchbarHeader>
    );
  }
}

export default Searchbar;
