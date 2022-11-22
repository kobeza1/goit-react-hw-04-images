import { Component } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalStyled } from './Modal.styled';

class Modal extends Component {
  static propTypes = {
    img: PropTypes.shape({
      largeImageURL: PropTypes.string.isRequired,
      user: PropTypes.string.isRequired,
    }),
    onClose: PropTypes.func.isRequired,
  };
  componentDidMount() {
    window.addEventListener('keydown', this.onCloseByEscape);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onCloseByEscape);
  }
  onCloseByEscape = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };
  onClosebyBackdrop = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };
  render() {
    const { largeImageURL, tags } = this.props.currentImage;

    return (
      <Overlay className="overlay" onClick={this.onClosebyBackdrop}>
        <ModalStyled className="modal">
          <img src={largeImageURL} alt={tags} />
        </ModalStyled>
      </Overlay>
    );
  }
}

export default Modal;
