import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Link,
} from '@mui/material';

const formatDateTime = (date) => {
  const d = new Date(date);
  return d.toLocaleString();
};

const URLList = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <Typography variant="body1" mt={2}>
        No URLs have been shortened yet.
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Original URL</strong></TableCell>
            <TableCell><strong>Shortened URL</strong></TableCell>
            <TableCell><strong>Expiry Time</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((urlObj) => (
            <TableRow key={urlObj.id}>
              <TableCell>
                <Link href={urlObj.longUrl} target="_blank" rel="noopener">
                  {urlObj.longUrl}
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  href={`http://localhost:3000/${urlObj.shortcode}`}
                  target="_blank"
                  rel="noopener"
                >
                  {`localhost:3000/${urlObj.shortcode}`}
                </Link>
              </TableCell>
              <TableCell>
                {formatDateTime(urlObj.expiresAt)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default URLList;
