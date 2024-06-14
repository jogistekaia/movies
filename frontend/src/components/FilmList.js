import React, { useState, useEffect } from 'react';
import { getFilms, addFilm, updateFilmStatus, deleteFilm } from '../services/filmService';
import FilmTable from './FilmTable';
import FilmForm from './FilmForm';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const FilmList = () => {
    const [films, setFilms] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
    const [categoryFilter, setCategoryFilter] = useState('');

    useEffect(() => {
        fetchFilms();
    }, [categoryFilter]);  // Fetch films again when the category filter changes

    const fetchFilms = async () => {
        try {
            const response = await getFilms(categoryFilter);
            setFilms(response.data);
        } catch (error) {
            console.error('Error fetching films:', error);
        }
    };

    const handleAddFilm = async (film) => {
        try {
            await addFilm(film);
            fetchFilms();
        } catch (error) {
            console.error('Error adding film:', error);
        }
    };

    const handleToggleStatus = async (eidr, active) => {
        await updateFilmStatus(eidr, active);
        fetchFilms();
    };

    const handleDelete = async (eidr) => {
        try {
            await deleteFilm(eidr);
            fetchFilms();
        } catch (error) {
            console.error('Error deleting film:', error);
        }
    };

    const handleSort = (key) => {
        const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
        setSortConfig({ key, direction });
    };

    const sortedFilms = [...films].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const handleCategoryFilterChange = (event) => {
        setCategoryFilter(event.target.value);
    };

    return (
        <div>
            <FilmForm onAddFilm={handleAddFilm} />
            <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select value={categoryFilter} onChange={handleCategoryFilterChange}>
                    <MenuItem value=""><em>All</em></MenuItem>
                    <MenuItem value="Comedy">Comedy</MenuItem>
                    <MenuItem value="Drama">Drama</MenuItem>
                    <MenuItem value="Action">Action</MenuItem>
                    <MenuItem value="Crime">Crime</MenuItem>
                    <MenuItem value="Horror">Horror</MenuItem>
                </Select>
            </FormControl>
            <FilmTable
                films={sortedFilms}
                onToggleStatus={handleToggleStatus}
                onDelete={handleDelete}
                onSort={handleSort}
                sortConfig={sortConfig}
            />
        </div>
    );
};

export default FilmList;
