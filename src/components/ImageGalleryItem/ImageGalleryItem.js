import { useState } from 'react';
import './ImageGalleryItem.css';
import { ModalBox } from 'components/Modal/Modal';

export const ImageGalleryItem = ({ image, alt, largeImage }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <img
        onClick={openModal}
        src={image}
        alt={alt}
        className="ImageGalleryItem-image"
      />
      <ModalBox
        state={isModalOpen}
        onClose={closeModal}
        largeImage={largeImage}
        alt={alt}
      />
    </>
  );
};
