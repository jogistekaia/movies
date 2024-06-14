package org.example.service;

import org.example.model.Film;

import java.util.List;

public interface FilmService {
    List<Film> getAllFilms(String category);
    Film getFilmByEidr(String eidr);
    void addFilm(Film film);
    void updateFilmStatus(String eidr, boolean active);
    void deleteFilm(String eidr);
}