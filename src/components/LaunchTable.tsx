import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { fetchLaunches } from '../api/spacexApi';
import { Column } from '../types';
import { LaunchTableData } from '../types';

const columns: readonly Column[] = [
  { id: 'name', label: 'Name', minWidth: 150, align: 'left' },
  { id: 'date_utc', label: 'Launch Date', minWidth: 150, align: 'center' },
  { id: 'id', label: 'ID', minWidth: 100, align: 'left' },
  { id: 'details', label: 'Details', minWidth: 300, align: 'left' },
];

export default function LaunchTable() {
  const [launches, setLaunches] = useState<LaunchTableData[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const getLaunches = async () => {
      try {
        const data = await fetchLaunches();
        setLaunches(data);
      } catch (error) {
        console.error('Failed to fetch launches', error);
      }
    };

    getLaunches();
  }, []);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {launches
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((launch) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={launch.id}>
                  {columns.map((column) => {
                    const value = column.id === 'date_utc'
                      ? new Date(launch.date_utc).toLocaleDateString()
                      : launch[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {value || 'N/A'}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={launches.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
