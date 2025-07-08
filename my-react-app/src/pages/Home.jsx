import React, { useState, useEffect } from 'react';
import URLShortenerForm from '../components/URLShortenerForm';
import URLList from '../components/URLList';
import { addShortenedURLs } from '../utils/urlService';

// const handleShorten = (newEntries) => {
//   addShortenedURLs(newEntries);
//   setShortenedURLs((prev) => [...prev, ...newEntries]);
// };


const Home = () => {
  const [shortenedURLs, setShortenedURLs] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('shortenedStats');
    if (saved) {
      setShortenedURLs(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('shortenedStats', JSON.stringify(shortenedURLs));
  }, [shortenedURLs]);

  const handleShorten = (newEntries) => {
    setShortenedURLs((prev) => [...prev, ...newEntries]);
  };

  return (
    <div style={{ maxWidth: '900px', margin: 'auto', padding: '20px' }}>
      <URLShortenerForm onShorten={handleShorten} />
      <URLList data={shortenedURLs} />
    </div>
  );
};

export default Home;