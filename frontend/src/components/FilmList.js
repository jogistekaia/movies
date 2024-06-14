import React, { useState, useEffect } from 'react';
import { getFilms, updateFilmStatus, deleteFilm } from '../services/filmService';
import FilmTable from './FilmTable';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const FilmList = () => {
    const [films, setFilms] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
    const [categoryFilter, setCategoryFilter] = useState('');
    const [selectedFilms, setSelectedFilms] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(5); // Number of rows per page

    useEffect(() => {
        fetchFilms();
    }, [categoryFilter, currentPage, pageSize]); // Refetch films when category filter, page or page size changes

    const fetchFilms = async () => {
        try {
            const response = await getFilms(categoryFilter, currentPage, pageSize);
            setFilms(response.data);
        } catch (error) {
            console.error('Error fetching films:', error);
        }
    };

    const handleToggleStatus = async (eidr, active) => {
        await updateFilmStatus(eidr, active);
        fetchFilms();
    };

    const handleDelete = async () => {
        try {
            await Promise.all(selectedFilms.map((eidr) => deleteFilm(eidr)));
            fetchFilms();
            setSelectedFilms([]); // Clear selected films after deletion
        } catch (error) {
            console.error('Error deleting films:', error);
        }
    };

    const handleDeleteSelected = async () => {
        try {
            await Promise.all(selectedFilms.map((eidr) => deleteFilm(eidr)));
            fetchFilms();
            setSelectedFilms([]); // Clear selected films after deletion
        } catch (error) {
            console.error('Error deleting films:', error);
        }
    };

    const handleSort = (key) => {
        const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
        setSortConfig({ key, direction });
    };

    const handleCategoryFilterChange = (event) => {
        setCategoryFilter(event.target.value);
    };

    return (
        <div>
            <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select value={categoryFilter} onChange={handleCategoryFilterChange}>
                    <MenuItem value="">
                        <em>All</em>
                    </MenuItem>
                    <MenuItem value="Comedy">Comedy</MenuItem>
                    <MenuItem value="Drama">Drama</MenuItem>
                    <MenuItem value="Action">Action</MenuItem>
                    <MenuItem value="Crime">Crime</MenuItem>
                    <MenuItem value="Horror">Horror</MenuItem>
                </Select>
            </FormControl>
            <FilmTable
                films={films}
                onToggleStatus={handleToggleStatus}
                onDelete={handleDelete}
                onSort={handleSort}
                sortConfig={sortConfig}
                selectedFilms={selectedFilms}
                setSelectedFilms={setSelectedFilms}
                onDeleteSelected={handleDeleteSelected}
                currentPage={currentPage}
                pageSize={pageSize}
                setCurrentPage={setCurrentPage}
                setPageSize={setPageSize}
            />
        </div>
    );
};

export default FilmList;
