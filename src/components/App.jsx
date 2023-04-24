import { Component } from 'react';
import { fetchImages, fetchMoreImages } from '../instruments/fetchAPI';
// import { notifyWarn } from '../instruments/notify';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import css from './App.module.css';

import Searchbar from './imageFinder/Searchbar';
import ImageGallery from './imageFinder/ImageGallery';
import Button from './imageFinder/Button';
import Loader from './imageFinder/Loader';

Notify.init({
  fontSize: '20px',
  width: '570px',
  position: 'center-top',
  cssAnimationDuration: 400,
  cssAnimationStyle: 'zoom',
  timeout: 1500,
});

export class App extends Component {
  state = {
    searchValue: '',
    images: [],
    isLoading: false,
    error: null,
  };

  async componentDidUpdate() {
    const { searchValue, images, isLoading, error } = this.state;
    if (images.length === 0 && error === null) {
      try {
        await fetchImages(searchValue).then(res => {
          if (res.length === 0) {
            this.setState({ isLoading: false, error: 'No results' });
          }
          this.setState({ images: res });
        });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  onSubmit = e => {
    const { searchValue } = this.state;
    e.preventDefault();
    const form = e.currentTarget;
    const inputValue = form.elements.input.value.trim();
    if (inputValue.length === 0) {
      Notify.failure(`❌ Write request in the searchbar`);
      return;
    } else if (inputValue === searchValue) {
      Notify.info(`Try another search word or click 'Load more' button`);
      return;
    }
    this.setState({
      searchValue: inputValue,
      images: [],
      isLoading: true,
      error: null,
    });
  };

  onClick = () => {
    const { searchValue } = this.state;
    this.setState({ isLoading: true });
    try {
      fetchMoreImages(searchValue).then(res => {
        this.setState(({ images }) => ({ images: [...images, ...res] }));
      });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { images, isLoading, error, disabled } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.onSubmit} />
        {error && <h1>{error}</h1>}
        {images.length > 0 ? (
          <>
            <ImageGallery images={images} />
            {isLoading ? <Loader /> : <Button onClick={this.onClick} />}
          </>
        ) : (
          isLoading && <Loader />
        )}
      </div>
    );
  }
}
