import axios from 'axios';

const API_URL = 'http://localhost:8080/api/films';

export const getFilms = (category) => axios.get(API_URL, {
    params: { category }
});
export const getFilmByEidr = (eidr) => axios.get(`${API_URL}/${eidr}`);
export const addFilm = (film) => axios.post(API_URL, film);
export const updateFilmStatus = (eidr, active) => axios.put(`${API_URL}/${eidr}`, null, { params: { active } });
export const deleteFilm = (eidr) => axios.delete(`${API_URL}/${eidr}`);