import React, { useState, useEffect } from 'react';
import { getFilms, addFilm, deleteFilm } from '../services/filmService';
import FilmTable from './FilmTable';
import FilmForm from './FilmForm';

const FilmList = () => {
    const [films, setFilms] = useState([]);

    useEffect(() => {
        fetchFilms();
    }, []);

    const fetchFilms = async () => {
        try {
            const response = await getFilms();
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

    const handleDelete = async (eidr) => {
        try {
            await deleteFilm(eidr);
            fetchFilms();
        } catch (error) {
            console.error('Error deleting film:', error);
        }
    };

    return (
        <div>
            <FilmForm onAddFilm={handleAddFilm} />
            <FilmTable films={films} onDelete={handleDelete} />
        </div>
    );
};

export default FilmList;
