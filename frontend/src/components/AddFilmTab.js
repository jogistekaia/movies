import React, { useState } from 'react';
import FilmForm from './FilmForm';
import { addFilm } from '../services/filmService';
import '../styles.css';

const AddFilmTab = () => {
    const [error, setError] = useState('');

    const handleAddFilm = async (film, resetForm) => {
        try {
            await addFilm(film);
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

    return (
        <div>
            <FilmForm onAddFilm={handleAddFilm} error={error} />
        </div>
    );
};

export default AddFilmTab;
