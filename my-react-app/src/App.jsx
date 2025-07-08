import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Stats from './pages/Stats';
import RedirectPage from './components/RedirectPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stats" element={<Stats />} />
      <Route path="/:shortcode" element={<RedirectPage />} />
    </Routes>
  );
};

export default App;
