import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from './App.styled';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { pixabayApi, PER_PAGE } from 'pixabayApi';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';

export class App extends Component {
  state = {
    imageName: '',
    page: 1,
    images: [],
    loading: false,
    totalPage: 0,
    error: null,
    showModal: false,
    modalImg: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.imageName !== this.state.imageName ||
      prevState.page !== this.state.page
    ) {
      this.searchImages();
    }
  }

  searchImages() {
    const { imageName, page } = this.state;

    this.setState({ loading: true, images: [] });

    pixabayApi(imageName, page)
      .then(data => {
        const quantityPage = Math.ceil(data.totalHits / PER_PAGE);

        if (data.totalHits === 0) {
          toast.warn('Sorry, no images found. Please, try again!');
          return;
        }

        return this.setState({ images: data.hits, totalPage: quantityPage });
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }

  handleSearch = imageName => {
    if (imageName === this.state.imageName) {
      toast.warn(`you entered the same request!`);
      return;
    }
    this.setState({
      imageName,
      page: 1,
      images: [],
      error: null,
      totalPage: 0,
    });
  };

  handleLoadMore = () =>
    this.setState(prevState => ({ page: prevState.page + 1 }));

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  handleImgModal = largeImageURL => {
    this.setState({ modalImg: largeImageURL });
  };

  render() {
    const { images, loading, page, totalPage, error, showModal, modalImg } =
      this.state;
    const btnLoadMore = totalPage - page;

    return (
      <Container>
        <Searchbar onSubmit={this.handleSearch} />
        {loading && <Loader />}
        {error && toast.error(error.message)}
        {images.length > 0 && (
          <ImageGallery
            images={images}
            getImgModal={this.handleImgModal}
            openModal={this.toggleModal}
          />
        )}
        {btnLoadMore > 0 && <Button onClick={this.handleLoadMore} />}
        {showModal && (
          <Modal closeModal={this.toggleModal}>
            <img src={modalImg} alt="" />
          </Modal>
        )}
        <ToastContainer theme="colored" autoClose={2000} position="top-right" />
      </Container>
    );
  }
}
