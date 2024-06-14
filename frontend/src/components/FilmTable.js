import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Switch, TableSortLabel} from '@mui/material';

const FilmTable = ({ films, onDelete, onToggleStatus,  onSort, sortConfig }) => {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                      <TableSortLabel
                        active={sortConfig.key === 'name'}
                        direction={sortConfig.direction}
                        onClick={() => onSort('name')}
                      >
                        Name
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>EIDR</TableCell>
                    <TableCell>Categories</TableCell>
                    <TableCell>
                        <TableSortLabel
                            active={sortConfig.key === 'rating'}
                            direction={sortConfig.direction}
                            onClick={() => onSort('rating')}
                        >
                            Rating
                        </TableSortLabel>
                    </TableCell>
                    <TableCell>Year</TableCell>
                    <TableCell>Active</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {films.map(film => (
                    <TableRow key={film.eidr}>
                        <TableCell>{film.name}</TableCell>
                        <TableCell>{film.eidr}</TableCell>
                        <TableCell>{film.categories.join(', ')}</TableCell>
                        <TableCell>{film.rating}</TableCell>
                        <TableCell>{film.year}</TableCell>
                        <TableCell>
                            <Switch
                                checked={film.active}
                                onChange={() => onToggleStatus(film.eidr, !film.active)}
                                color="primary"
                            />
                        </TableCell>
                        <TableCell>
                            <Button onClick={() => onDelete(film.eidr)}>Delete</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default FilmTable;
