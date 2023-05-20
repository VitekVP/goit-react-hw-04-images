import PropTypes from 'prop-types';
import { ImageGalleryitem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ images, getImgModal, openModal }) => {
  return (
    <Gallery>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryitem
          key={id}
          webformatURL={webformatURL}
          tags={tags}
          largeImageURL={largeImageURL}
          getImgModal={getImgModal}
          openModal={openModal}
        />
      ))}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  getImgModal: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};
