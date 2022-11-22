import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import { fetchImages } from 'utils/api-service';
import { propFilter } from 'utils/prop-filter';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Container } from './App.styled';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    if (query === '') {
      return;
    }
    const fetchData = async () => {
      try {
        const response = await fetchImages(page, query);
        const {
          data: { hits },
        } = response;
        if (page !== 1) {
          setImages(state => [...state, ...propFilter(hits)]);
        } else setImages([...propFilter(hits)]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [page, query]);

  const onSubmit = query => {
    setQuery(query);
    setPage(1);
    setIsLoading(true);
  };

  const pageIncrement = () => {
    setPage(state => state + 1);
    setIsLoading(true);
  };

  const openModal = image => {
    setCurrentImage(image);
  };

  const closeModal = () => {
    setCurrentImage(null);
  };

  return (
    <Container>
      <Searchbar onSubmit={onSubmit} />
      {images.length !== 0 && (
        <>
          <ImageGallery images={images} onClick={openModal} />
          <Button text="Load more" onClick={pageIncrement} />
        </>
      )}
      {isLoading && <Loader />}
      {currentImage && (
        <Modal currentImage={currentImage} onClose={closeModal} />
      )}
      <ToastContainer />
    </Container>
  );
};

export default App;
