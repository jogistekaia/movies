import React from 'react';
import { TextField, Button, Checkbox, FormControlLabel, FormGroup, FormControl, FormLabel, RadioGroup, Radio } from '@mui/material';
import '../styles.css'; // Import your custom CSS file

const FilmForm = ({ onAddFilm, error }) => {
    const [film, setFilm] = React.useState({
        name: '',
        eidr: '',
        categories: [],
        rating: '',
        year: '',
        active: true
    });

    const [validationErrors, setValidationErrors] = React.useState({});

    React.useEffect(() => {
        if (error) {
            setValidationErrors(prev => ({ ...prev, eidr: error }));
        }
    }, [error]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilm(prev => ({ ...prev, [name]: value }));
    };

    const handleCategoryChange = (category) => {
        setFilm(prev => {
            const categories = prev.categories.includes(category)
                ? prev.categories.filter(cat => cat !== category)
                : [...prev.categories, category];
            return { ...prev, categories };
        });
    };

    const handleActivityChange = (e) => {
        setFilm(prev => ({ ...prev, active: e.target.value === 'active' }));
    };

    const resetForm = () => {
        setFilm({ name: '', eidr: '', categories: [], rating: '', year: '', active: true });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate inputs
        const errors = {};
        if (!film.name.trim()) {
            errors.name = 'Name is required';
        }
        if (!film.eidr.trim()) {
            errors.eidr = 'EIDR is required';
        }
        if (film.rating < 0 || film.rating > 10) {
            errors.rating = 'Rating must be between 0 and 10';
        }
        if (film.year.toString().length !== 4) {
            errors.year = 'Year must be a 4-digit number';
        }
        if (new Date(film.year, 0, 1) > new Date()) {
            errors.year = 'Year cannot be in the future';
        }
        if (film.categories.length === 0) {
            errors.categories = 'At least one category must be selected';
        }

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        // Clear validation errors if there are no errors
        setValidationErrors({});

        // Submit film data
       console.log("Film data: " + JSON.stringify(film));
        try {
            await onAddFilm(film, resetForm);
        } catch (error) {
            console.error('Error adding film:', error);
        }
    };

    const categories = ['Comedy', 'Drama', 'Action', 'Crime', 'Horror'];

    return (
        <form onSubmit={handleSubmit} className="film-form">
            <TextField
                label="Name"
                name="name"
                value={film.name}
                onChange={handleChange}
                error={!!validationErrors.name}
                helperText={validationErrors.name}
                required
                className="form-field"
            />
            <TextField
                label="EIDR"
                name="eidr"
                value={film.eidr}
                onChange={handleChange}
                error={!!validationErrors.eidr}
                helperText={validationErrors.eidr}
                required
                className="form-field"
            />
            <div className="category-checkboxes">
            <FormGroup>
                {categories.map(category => (
                    <FormControlLabel
                        key={category}
                        control={
                            <Checkbox
                                checked={film.categories.includes(category)}
                                onChange={() => handleCategoryChange(category)}
                            />
                        }
                        label={category}
                        className="category-label"
                    />
                ))}
                {validationErrors.categories && (
                    <div className="error-message">{validationErrors.categories}</div>
                )}
            </FormGroup>
            </div>
            <TextField
                label="Rating"
                name="rating"
                value={film.rating}
                onChange={handleChange}
                error={!!validationErrors.rating}
                helperText={validationErrors.rating}
                required
                type="number"
                inputProps={{ min: 0, max: 10 }}
                className="form-field"
            />
            <TextField
                label="Year"
                name="year"
                value={film.year}
                onChange={handleChange}
                error={!!validationErrors.year}
                helperText={validationErrors.year}
                required
                type="number"
                inputProps={{ maxLength: 4 }}
                className="form-field"
            />
            <FormControl component="fieldset" className="radio">
                <FormLabel component="legend">Status</FormLabel>
                <RadioGroup row  name="activity" value={film.active ? 'active' : 'inactive'} onChange={handleActivityChange}>
                    <FormControlLabel value="active" control={<Radio />} label="Active" />
                    <FormControlLabel value="inactive" control={<Radio />} label="Inactive" />
                </RadioGroup>
            </FormControl>
            <Button type="submit" id="submitFilm" className="nav-link">Add Film</Button>
        </form>
    );
};

export default FilmForm;