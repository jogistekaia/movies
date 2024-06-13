import axios from 'axios';

const API_URL = 'http://localhost:8080/api/films';

export const getFilms = () => axios.get(API_URL);
export const getFilmByEidr = (eidr) => axios.get(`${API_URL}/${eidr}`);
export const addFilm = (film) => axios.post(API_URL, film);
export const deleteFilm = (eidr) => axios.delete(`${API_URL}/${eidr}`);