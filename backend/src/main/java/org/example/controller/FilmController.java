package org.example.controller;

import org.example.model.Film;
import org.example.service.FilmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<String> addFilm(@RequestBody Film film) {
        try {
            filmService.addFilm(film);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("EIDR already exists");
        }
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