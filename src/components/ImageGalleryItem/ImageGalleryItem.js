import React, { useState } from 'react';
import {
  ImgStyled,
  StyledListEl,
  StyledListElContainer,
  StyledModalImg,
} from './ImageGalleryItem.styled';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '90vw',
    maxHeight: '80vh',
    background: 'none',
    border: '1px solid #ab8f8f',
  },
};

Modal.setAppElement('#root');

export const ImageGalleryItem = ({ imageItem }) => {
  const [modalOpenItem, setModalOpenItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = itemId => {
    setIsLoading(true);

    // Затримка відображення модального вікна на 2 секунди
    setTimeout(() => {
      setModalOpenItem(itemId);
      setIsLoading(false);
    }, 200);
  };

  const closeModal = () => {
    setModalOpenItem(null);
  };

  return (
    <StyledListElContainer>
      {imageItem.map(item => {
        const { id, webformatURL, tags, largeImageURL } = item;

        return (
          <StyledListEl key={id}>
            <ImgStyled
              src={webformatURL}
              alt={tags}
              onClick={() => openModal(id)}
            />

            <Modal
              isOpen={modalOpenItem === id}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >

              {isLoading ? (
                <div>Loading...</div>
              ) : (
                <StyledModalImg src={largeImageURL} alt={tags} />
              )}

            </Modal>
          </StyledListEl>
        );
      })}
    </StyledListElContainer>
  );
};
