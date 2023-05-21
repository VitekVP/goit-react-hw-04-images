import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from './App.styled';

import { pixabayApi, PER_PAGE } from 'pixabayApi';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalPage, settoTalPage] = useState(0);
  const [error, setError] = useState(null);
  const [modalImg, setModalImg] = useState('');

  useEffect(() => {
    if (query === '') {
      return;
    }

    setLoading(true);

    pixabayApi(query, page)
      .then(data => {
        if (data.totalHits === 0) {
          toast.warn('Sorry, no images found. Please, try again!');
          setImages([]);
          settoTalPage(0);
          return;
        }

        const quantityPage = Math.ceil(data.totalHits / PER_PAGE);
        setImages(data.hits);
        settoTalPage(quantityPage);
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, [page, query]);

  const handleSearch = query => {
    if (query.trim() === '') {
      toast.warn(`Please enter your request!`);
      setImages([]);
      settoTalPage(0);
      return;
    }

    setQuery(query);
    setPage(1);
    setError(null);
  };

  const handleLoadMore = () => setPage(page => page + 1);

  const toggleModal = () => setShowModal(!showModal);

  const handleImgModal = largeImageURL => setModalImg(largeImageURL);

  const btnLoadMore = totalPage - page;

  return (
    <Container>
      <Searchbar onSubmit={handleSearch} />
      {loading && <Loader />}
      {error && toast.error(error.message)}
      {images.length > 0 && (
        <ImageGallery
          images={images}
          getImgModal={handleImgModal}
          openModal={toggleModal}
        />
      )}
      {btnLoadMore > 0 && <Button onClick={handleLoadMore} />}
      {showModal && (
        <Modal closeModal={toggleModal}>
          <img src={modalImg} alt="" />
        </Modal>
      )}
      <ToastContainer theme="colored" autoClose={2000} position="top-right" />
    </Container>
  );
};
