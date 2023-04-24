import { Component } from 'react';
import css from './ImageFinder.module.css';

import Modal from './Modal';

export default class ImageGalleryItem extends Component {
  state = {
    smallImage: this.props.image.webformatURL,
    largeImage: this.props.image.largeImageURL,
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { smallImage, largeImage, showModal } = this.state;
    return (
      <li className={css.ImageGalleryItem}>
        {showModal && <Modal image={largeImage} onClose={this.toggleModal} />}
        <img
          src={smallImage}
          alt="Image"
          className={css['ImageGalleryItem-image']}
          onClick={this.toggleModal}
        />
      </li>
    );
  }
}
