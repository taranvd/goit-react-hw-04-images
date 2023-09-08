import { useState, useEffect } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { AppWrapp, GlobalStyled } from './GlobalStyle';
import { error, warn, info, success } from 'services/toasts';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { fetchImages } from 'services/api';
import { ToastContainer } from 'react-toastify';
import { nanoid } from 'nanoid';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalImg, setTotalImg] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query === '') {
      return;
    }

    async function loadImages() {
      setIsLoading(true);
      const normalizeQuery = query.slice(8, query.length);

      try {
        const { hits, totalHits } = await fetchImages(normalizeQuery, page);
        if (totalHits !== 0 && page === 0) {
          success(`Find ${totalHits} images`);
        } else if (totalHits === 0) {
          warn('Image not found. Try something else 😐');
        }
        setImages(prevState => [...prevState, ...hits]);
        setTotalImg(totalHits);
      } catch (warn) {
        console.warn(warn);
        error('Oops! something went wrong. Please try again later. ❌');
      } finally {
        setIsLoading(false);
      }
    }
    loadImages();
  }, [page, query]);

  useEffect(() => {
    if (images.length === totalImg && totalImg > 0 && page !== 1) {
      info('No more photos!');
    }
  }, [images.length, page, totalImg]);

  function handleQueryFormSubmit(newQuery) {
    if (newQuery.trim() === '') {
      warn('Please enter something 👀');
      return;
    }

    setQuery(`${nanoid(7)}/${newQuery}`);
    setImages([]);
    setPage(1);
    setTotalImg(0);
  }

  const handleLoadMoreButton = () => setPage(prevPage => prevPage + 1);

  const shouldRenderButton =
    !isLoading && images.length > 0 && images.length < totalImg;

  return (
    <AppWrapp>
      <Searchbar onSubmit={handleQueryFormSubmit} />
      <ImageGallery images={images} />

      {isLoading && <Loader />}

      {shouldRenderButton && <Button loadMore={handleLoadMoreButton} />}

      <ToastContainer />
      <GlobalStyled />
    </AppWrapp>
  );
};
