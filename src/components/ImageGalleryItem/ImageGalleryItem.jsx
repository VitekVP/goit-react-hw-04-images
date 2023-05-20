import PropTypes from 'prop-types';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryitem = ({
  webformatURL,
  tags,
  largeImageURL,
  getImgModal,
  openModal,
}) => {
  return (
    <GalleryItem onClick={() => getImgModal(largeImageURL)}>
      <GalleryItemImage src={webformatURL} alt={tags} onClick={openModal} />
    </GalleryItem>
  );
};

ImageGalleryitem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  getImgModal: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};
