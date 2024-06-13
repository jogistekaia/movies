import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';

const FilmTable = ({ films, onDelete, onToggleStatus }) => {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>EIDR</TableCell>
                    <TableCell>Categories</TableCell>
                    <TableCell>Rating</TableCell>
                    <TableCell>Year</TableCell>
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
                            <Button onClick={() => onDelete(film.eidr)}>Delete</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default FilmTable;
