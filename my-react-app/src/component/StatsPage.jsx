import React, { useEffect, useState } from 'react';
import {
  Typography,
  Paper,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Divider,
} from '@mui/material';

// Dummy function to simulate fetching from localStorage or session
const loadStats = () => {
  const data = localStorage.getItem('shortenedStats');
  return data ? JSON.parse(data) : [];
};

const StatsPage = () => {
  const [urlStats, setUrlStats] = useState([]);

  useEffect(() => {
    const stats = loadStats();
    setUrlStats(stats);
  }, []);

  if (urlStats.length === 0) {
    return (
      <Typography variant="body1" mt={3}>
        No statistics available.
      </Typography>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        URL Shortener Statistics
      </Typography>

      {urlStats.map((item, idx) => (
        <Paper key={idx} elevation={3} sx={{ p: 2, my: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Shortcode: <strong>{item.shortcode}</strong>
          </Typography>

          <Typography variant="body2">
            Original URL: <a href={item.longUrl}>{item.longUrl}</a>
          </Typography>
          <Typography variant="body2">
            Created At: {new Date(item.createdAt).toLocaleString()}
          </Typography>
          <Typography variant="body2">
            Expires At: {new Date(item.expiresAt).toLocaleString()}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Total Clicks: <strong>{item.clicks.length}</strong>
          </Typography>

          <Divider sx={{ my: 1 }} />

          {item.clicks.length > 0 && (
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Timestamp</TableCell>
                    <TableCell>Source</TableCell>
                    <TableCell>Location</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {item.clicks.map((click, i) => (
                    <TableRow key={i}>
                      <TableCell>{new Date(click.timestamp).toLocaleString()}</TableCell>
                      <TableCell>{click.source || 'Unknown'}</TableCell>
                      <TableCell>{click.location || 'N/A'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      ))}
    </Box>
  );
};

export default StatsPage;
