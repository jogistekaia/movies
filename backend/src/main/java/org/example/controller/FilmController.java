package org.example.controller;

import org.example.model.Film;
import org.example.service.FilmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/films")
public class FilmController {

    private final FilmService filmService;

    @Autowired
    public FilmController(FilmService filmService) {
        this.filmService = filmService;
    }

    @GetMapping
    public List<Film> getAllFilms(@RequestParam(required = false) String category) {
        return filmService.getAllFilms(category);
    }

    @GetMapping("/{eidr}")
    public Film getFilmByEidr(@PathVariable String eidr) {
        return filmService.getFilmByEidr(eidr);
    }

    @PostMapping
    public void addFilm(@RequestBody Film film) {
        filmService.addFilm(film);
    }

    @PutMapping("/{eidr}")
    public void updateFilmStatus(@PathVariable String eidr, @RequestParam boolean active) {
        filmService.updateFilmStatus(eidr, active);
    }

    @DeleteMapping("/{eidr}")
    public void deleteFilm(@PathVariable String eidr) {
        filmService.deleteFilm(eidr);
    }
}