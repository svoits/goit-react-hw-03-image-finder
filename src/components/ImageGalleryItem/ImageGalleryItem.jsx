import { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal';
import { ImageGalleryItemImg } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  toggleModal = () => {
    this.setState(({ isModalOpen }) => ({
      isModalOpen: !isModalOpen,
    }));
  };

  render() {
    const { isModalOpen } = this.state;
    const {
      image: { webformatURL, largeImageURL, tags },
    } = this.props;

    console.log(this.props.image);
    console.log(webformatURL);
    console.log(largeImageURL);
    console.log(tags);

    return (
      <ImageGalleryItem>
        <ImageGalleryItemImg
          src={this.props.image?.webformatURL}
          alt={tags}
          onClick={this.toggleModal}
        />
        {isModalOpen && (
          <Modal
            largeImageURL={largeImageURL}
            tags={tags}
            onClose={this.toggleModal}
          />
        )}
      </ImageGalleryItem>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};
