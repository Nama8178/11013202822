import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { findByShortcode, logClick } from '../Utils/urlService';
import loggerMiddleware from '../Utils/urlsService';
import { CircularProgress, Box, Typography } from '@mui/material';

const RedirectPage = () => {
  const { shortcode } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const urlData = findByShortcode(shortcode);

    if (!urlData) {
      loggerMiddleware('REDIRECT_FAILED_NOT_FOUND', { shortcode });
      setStatus('notfound');
      return;
    }

    const now = new Date();
    const expiry = new Date(urlData.expiresAt);

    if (now > expiry) {
      loggerMiddleware('REDIRECT_FAILED_EXPIRED', { shortcode });
      setStatus('expired');
      return;
    }

    // Log click analytics
    const clickInfo = {
      timestamp: now.toISOString(),
      source: navigator.userAgent,
      location: 'Mocked - India', // Replace with real location if needed
    };

    logClick(shortcode, clickInfo);
    loggerMiddleware('REDIRECT_SUCCESS', {
      shortcode,
      destination: urlData.longUrl,
    });

    // Redirect
    window.location.href = urlData.longUrl;
  }, [shortcode]);

  if (status === 'loading') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
        <Typography variant="body1" sx={{ ml: 2 }}>
          Redirecting...
        </Typography>
      </Box>
    );
  }

  if (status === 'notfound') {
    return (
      <Box textAlign="center" mt={10}>
        <Typography variant="h4" color="error">
          404 - Shortcode Not Found
        </Typography>
        <Typography variant="body1">This link does not exist.</Typography>
      </Box>
    );
  }

  if (status === 'expired') {
    return (
      <Box textAlign="center" mt={10}>
        <Typography variant="h4" color="warning.main">
          Link Expired
        </Typography>
        <Typography variant="body1">This shortened URL has expired.</Typography>
      </Box>
    );
  }

  return null;
};

export default RedirectPage;
