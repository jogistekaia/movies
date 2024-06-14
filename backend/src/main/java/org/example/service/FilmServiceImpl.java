package org.example.service;
import org.example.model.Film;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FilmServiceImpl implements FilmService {

    private List<Film> films = new ArrayList<>();

    @Override
    public List<Film> getAllFilms(String category) {
        if (category == null || category.isEmpty()) {
            return films;
        }
        return films.stream()
                .filter(film -> film.getCategories().contains(category))
                .collect(Collectors.toList());
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
        if (eidrExists(film.getEidr())) {
            throw new IllegalArgumentException("EIDR already exists");
        }
        films.add(film);
    }

    @Override
    public void updateFilmStatus(String eidr, boolean active) {
        films.stream()
                .filter(film -> film.getEidr().equals(eidr))
                .findFirst()
                .ifPresent(film -> film.setActive(active));
    }

    @Override
    public void deleteFilm(String eidr) {
        films.removeIf(film -> film.getEidr().equals(eidr));
    }

    @Override
    public boolean eidrExists(String eidr) {
        return films.stream().anyMatch(film -> film.getEidr().equals(eidr));
    }
}