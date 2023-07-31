import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

export const ImageGallery = ({ images, toggleModal }) => {
return (
    <ul className="ImageGallery">
    {images.map(image => {
        return (
        <ImageGalleryItem
            key={image.id}
            image={image}
            toggleModal={toggleModal}
        />
        );
    })}
    </ul>
);
};

ImageGallery.propTypes = {
images: PropTypes.arrayOf(
    PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    })
).isRequired,
toggleModal: PropTypes.func.isRequired,
};