import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalStyled } from './Modal.styled';

export const Modal = ({ onClose, currentImage }) => {
  const onClosebyBackdrop = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const onCloseByEscape = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onCloseByEscape);

    return () => {
      window.removeEventListener('keydown', onCloseByEscape);
    };
  }, [onClose]);

  const { largeImageURL, tags } = currentImage;

  return (
    <Overlay className="overlay" onClick={onClosebyBackdrop}>
      <ModalStyled className="modal">
        <img src={largeImageURL} alt={tags} />
      </ModalStyled>
    </Overlay>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  currentImage: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
