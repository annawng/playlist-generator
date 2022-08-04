import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import '../css/Playlist.css';

function Playlist(props) {
  const { playlist } = props;
  const [rows, setRows] = useState('');

  useEffect(() => {
    const convertDuration = (duration_ms) => {
      const duration_s = duration_ms / 1000;
      const min = Math.floor(duration_s / 60);
      const sec = ('0' + Math.floor(duration_s % 60)).slice(-2);
      return `${min}:${sec}`;
    };

    const rows = playlist.map((song, index) => ({
      index: index + 1,
      name: song.name,
      artist: song.artists[0].name,
      duration: convertDuration(song.duration_ms),
      preview_url: song.preview_url,
      uri: song.uri,
    }));

    setRows(rows);
  }, [playlist]);

  return (
    rows && (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>#</TableCell>
              <TableCell>TITLE</TableCell>
              <TableCell>ARTIST</TableCell>
              <TableCell align='center'>TIME</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.uri} sx={{ 'th, td': { border: 0 } }}>
                <TableCell component='th' scope='row' align='center'>
                  {row.index}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.artist}</TableCell>
                <TableCell align='center'>{row.duration}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  );
}

export default Playlist;
