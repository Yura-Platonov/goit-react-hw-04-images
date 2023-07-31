import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import React, { useEffect, useState } from 'react';
import { getData } from './API/api';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (query.trim() !== '') {
      fetchImages(page, query);
    }
  }, [query, page]);

  const fetchImages = async (page, query) => {
    setIsLoading(true);
    try {
      const { hits, totalHits } = await getData(query, page);
      if (hits.length === 0) {
        Notify.failure(
          'There are no images found. Please, enter a valid value'
        );
      }
      setImages(prevImages => [...prevImages, ...hits]);
      setTotal(totalHits);
    } catch (error) {
      console.error();
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = search => {
    if (search.trim() === '') {
      return Notify.warning('You wrote nothing');
    } else if (search !== query) {
      setImages([]);
      setPage(1);
      setQuery(search);
    }
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = (largeImageURL = '') => {
    setShowModal(prevState => !prevState);
    setLargeImage(largeImageURL);
  };

  const totalPage = Math.ceil(total / 12);

  return (
    <div className="app">
      <Searchbar onSearch={handleSearch} />
      {images.length > 0 && (
        <ImageGallery images={images} toggleModal={toggleModal} />
      )}
      {isLoading && <Loader />}
      {images.length > 0 && totalPage > page && (
        <Button onLoadMore={handleLoadMore}></Button>
      )}
      {showModal && (
        <Modal onClickClose={toggleModal} image={largeImage}></Modal>
      )}
    </div>
  );
};