import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  Box,
  Divider,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import loggerMiddleware from '../Utils/loggerMiddleware';

// Inside handleSubmit (when URL is shortened)
loggerMiddleware('URL_SHORTENED', {
  originalUrl: url,
  shortcode: short,
  expiresAt: expiry.toISOString(),
});


const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const isValidShortcode = (code) => /^[a-zA-Z0-9_-]+$/.test(code);

const URLShortenerForm = ({ onShorten }) => {
  const [entries, setEntries] = useState([
    { id: uuidv4(), url: '', validity: '', shortcode: '', error: '' },
  ]);

  const handleChange = (id, field, value) => {
    setEntries((prev) =>
      prev.map((entry) =>
        entry.id === id ? { ...entry, [field]: value, error: '' } : entry
      )
    );
  };

  const addEntry = () => {
    if (entries.length < 5) {
      setEntries([...entries, { id: uuidv4(), url: '', validity: '', shortcode: '', error: '' }]);
    }
  };

  const handleSubmit = () => {
    const processed = [];

    const updated = entries.map((entry) => {
      const { url, validity, shortcode } = entry;

      // Validation
      if (!url || !isValidUrl(url)) {
        return { ...entry, error: 'Invalid or missing URL' };
      }

      if (validity && (!/^\d+$/.test(validity) || parseInt(validity) <= 0)) {
        return { ...entry, error: 'Validity must be a positive number' };
      }

      if (shortcode && !isValidShortcode(shortcode)) {
        return { ...entry, error: 'Shortcode must be alphanumeric or underscore' };
      }

      // Default validity
      const minutes = validity ? parseInt(validity) : 30;
      const short = shortcode || Math.random().toString(36).substr(2, 6);

      const expiry = new Date(Date.now() + minutes * 60000);

      processed.push({
        id: entry.id,
        longUrl: url,
        shortcode: short,
        createdAt: new Date(),
        expiresAt: expiry,
      });

      return { ...entry, error: '' };
    });

    setEntries(updated);

    if (processed.length > 0) {
      onShorten(processed);
    }
  };

  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>
        URL Shortener
      </Typography>

      {entries.map((entry, index) => (
        <Paper key={entry.id} elevation={3} sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            URL #{index + 1}
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Long URL"
                value={entry.url}
                onChange={(e) => handleChange(entry.id, 'url', e.target.value)}
                error={Boolean(entry.error)}
                helperText={entry.error}
              />
            </Grid>

            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                label="Validity (minutes)"
                value={entry.validity}
                onChange={(e) => handleChange(entry.id, 'validity', e.target.value)}
              />
            </Grid>

            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                label="Custom Shortcode"
                value={entry.shortcode}
                onChange={(e) => handleChange(entry.id, 'shortcode', e.target.value)}
              />
            </Grid>
          </Grid>
        </Paper>
      ))}

      <Box mb={2}>
        {entries.length < 5 && (
          <Button variant="outlined" onClick={addEntry}>
            + Add More URL
          </Button>
        )}
      </Box>

      <Divider sx={{ my: 2 }} />

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Shorten URLs
      </Button>
    </Box>
  );
};

export default URLShortenerForm;
