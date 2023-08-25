import React, { useState } from 'react';
import { SearchBar } from './SearchBar/Searchbar';
import { GlobalStyle } from './Global.style';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { fetchImages } from './API';
import { Loader } from './Loader/Loader';
import { useEffect } from 'react';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [imagesPerPage] = useState(12);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = inputValue => {
    if (query === inputValue) {
      alert('you already wrote it');
    } else {
      setQuery(inputValue);
      setImages([]);
      setPage(1);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (query === '') return;
      try {
        setIsLoading(true);
        console.log(`HTTP request for ${query}, page ${page}`);

        const images = await fetchImages({ 
          query: query,
           page: page });

        if (images.length === 0) {
          alert('No images found.');
        }

        setImages(prevImages => [...prevImages, ...images]);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query, page]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
    setIsLoading(true);
  };

  return (
    <section style={{ position: 'relative' }}>
      <SearchBar onSubmit={onSubmit} />
      <ImageGallery images={images} />
      {isLoading && <Loader />}
      {images.length > 0 &&
        query !== '' &&
        images.length % imagesPerPage === 0 && (
          <Button onClick={handleLoadMore} />
        )}
      <GlobalStyle />
    </section>
  );
};
