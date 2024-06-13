package org.example.service;
import org.example.model.Film;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FilmServiceImpl implements FilmService {

    private List<Film> films = new ArrayList<>();

    @Override
    public List<Film> getAllFilms() {
        return films;
    }

    @Override
    public Film getFilmByEidr(String eidr) {
        return films.stream()
                .filter(film -> film.getEidr().equals(eidr))
                .findFirst()
                .orElse(null);
    }

    @Override
    public void addFilm(Film film) {
        films.add(film);
    }

    @Override
    public void deleteFilm(String eidr) {
        films.removeIf(film -> film.getEidr().equals(eidr));
    }
}