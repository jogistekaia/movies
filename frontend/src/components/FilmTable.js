import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Switch, TableSortLabel, Checkbox, TablePagination} from '@mui/material';
const FilmTable = ({ films, onDelete,  onToggleStatus, onSort, sortConfig, selectedFilms, setSelectedFilms,  onDeleteSelected, currentPage, pageSize, setCurrentPage, setPageSize }) => {
    const getComparator = (key, direction) => {
        return (a, b) => {
            if (direction === 'asc') {
                if (a[key] < b[key]) return -1;
                if (a[key] > b[key]) return 1;
                return 0;
            } else {
                if (a[key] > b[key]) return -1;
                if (a[key] < b[key]) return 1;
                return 0;
            }
        };
    };

    const sortedFilms = [...films].sort(getComparator(sortConfig.key, sortConfig.direction));

    const isSelected = (eidr) => selectedFilms.indexOf(eidr) !== -1;

    const handleCheckboxClick = (event, eidr) => {
        const selectedIndex = selectedFilms.indexOf(eidr);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = [...selectedFilms, eidr];
        } else {
            newSelected = selectedFilms.filter((id) => id !== eidr);
        }

        setSelectedFilms(newSelected);
    };

    const emptyRows = pageSize - Math.min(pageSize, sortedFilms.length - currentPage * pageSize);

    return (
        <>
            <Button onClick={onDeleteSelected} disabled={selectedFilms.length === 0}>
                Delete Selected
            </Button>
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
                        <TableCell>Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(pageSize > 0
                        ? sortedFilms.slice(currentPage * pageSize, currentPage * pageSize + pageSize)
                        : sortedFilms
                    ).map((film) => (
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
                                <Checkbox
                                    checked={isSelected(film.eidr)}
                                    onChange={(event) => handleCheckboxClick(event, film.eidr)}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={7} />
                        </TableRow>
                    )}
                </TableBody>
            </Table>
           <TablePagination
                rowsPerPageOptions={[5]}
                component="div"
                count={sortedFilms.length}
                rowsPerPage={pageSize}
                page={currentPage}
                onPageChange={(event, newPage) => setCurrentPage(newPage)}
                onRowsPerPageChange={(event) => {
                   setPageSize(parseInt(event.target.value, 10));
                   setCurrentPage(0);
                }}
            />
        </>
    );
};

export default FilmTable;