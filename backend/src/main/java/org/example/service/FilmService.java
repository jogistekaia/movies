package org.example.service;

import org.example.model.Film;

import java.util.List;

public interface FilmService {
    List<Film> getAllFilms();
    Film getFilmByEidr(String eidr);
    void addFilm(Film film);
    void deleteFilm(String eidr);
}