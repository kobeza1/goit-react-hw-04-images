import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import { fetchImages } from 'utils/api-service';
import { propFilter } from 'utils/prop-filter';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Container } from './App.styled';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';

class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    currentImage: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query) {
      this.getImages();
    }
    if (prevState.page !== page && page !== 1) {
      this.getMoreImages();
    }
  }

  onSubmit = query => {
    this.setState({ query: query, page: 1, isLoading: true });
  };

  getImages = async () => {
    const { page, query } = this.state;

    await fetchImages(page, query)
      .then(response => {
        const {
          data: { hits },
        } = response;
        if (hits.length === 0) {
          return toast('There are no images');
        }
        this.setState({
          images: [...propFilter(hits)],
        });
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  getMoreImages = async () => {
    this.setState({ isLoading: true });
    const { page, query } = this.state;

    await fetchImages(page, query)
      .then(response => {
        const {
          data: { hits },
        } = response;
        this.setState(prevState => ({
          images: [...prevState.images, ...propFilter(hits)],
        }));
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  pageIncrement = () => {
    const { page } = this.state;
    this.setState({ page: page + 1, isLoading: true });
  };

  openModal = image => {
    this.setState({ currentImage: image });
  };

  closeModal = () => {
    this.setState({
      currentImage: null,
    });
  };

  render() {
    return (
      <Container>
        <Searchbar onSubmit={this.onSubmit} />
        {this.state.images.length !== 0 && (
          <>
            <ImageGallery images={this.state.images} onClick={this.openModal} />
            <Button text="Load more" onClick={this.pageIncrement} />
          </>
        )}
        {this.state.isLoading && <Loader />}
        {this.state.currentImage && (
          <Modal
            currentImage={this.state.currentImage}
            onClose={this.closeModal}
          />
        )}
        <ToastContainer />
      </Container>
    );
  }
}

export default App;
