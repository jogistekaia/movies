import React, { useState, useEffect } from 'react';
import { getFilms, addFilm, updateFilmStatus, deleteFilm } from '../services/filmService';
import FilmTable from './FilmTable';
import FilmForm from './FilmForm';
import { FormControl, InputLabel, MenuItem, Select, Button } from '@mui/material';

const FilmList = () => {
    const [films, setFilms] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
    const [categoryFilter, setCategoryFilter] = useState('');
    const [error, setError] = useState('');
    const [selectedFilms, setSelectedFilms] = useState([]);

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

    const handleAddFilm = async (film, resetForm) => {
        try {
            await addFilm(film);
            fetchFilms();
            setError(''); // Clear any previous error
            resetForm(); // Reset form after successful addition
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setError('EIDR already exists');
            } else {
                console.error('Error adding film:', error);
            }
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
            <FilmForm onAddFilm={handleAddFilm} error={error} />
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
            />
        </div>
    );
};

export default FilmList;
