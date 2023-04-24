import css from './ImageFinder.module.css';

import ImageGalleryItem from './ImageGalleryItem';

export default function ImageGallery({ images }) {
  return (
    <ul className={css.ImageGallery}>
      {images.map(image => {
        return <ImageGalleryItem image={image} key={image.id} />;
      })}
    </ul>
  );
}
