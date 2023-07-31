import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClickClose, image }) => {
  useEffect(() => {
    const handleKeyDawn = event => {
      if (event.code === 'Escape') {
        onClickClose();
      }
    };
    window.addEventListener('keydown', handleKeyDawn);
    return () => window.removeEventListener('keydown', handleKeyDawn);
  }, [onClickClose]);

  const handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      onClickClose();
    }
  };

  return createPortal(
    <div className="Overlay" onClick={handleOverlayClick}>
      <div className="Modal">
        <img className="Modal-image" src={image} alt="error" />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  onClickClose: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
};