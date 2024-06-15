package org.example;

import org.example.model.Film;
import org.example.service.FilmService;
import org.example.service.FilmServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class FilmServiceImplTest {

    private FilmService filmService;

    @BeforeEach
    void setUp() {
        filmService = new FilmServiceImpl();
    }

    @Test
    void testGetAllFilms() {
        // Arrange
        Film film1 = new Film("Film 1", "EIDR-1", new HashSet<>(Arrays.asList("Action", "Adventure")), 4.5, 2020, true);
        Film film2 = new Film("Film 2", "EIDR-2", new HashSet<>(Arrays.asList("Drama", "Romance")), 4.2, 2019, true);

        filmService.addFilm(film1);
        filmService.addFilm(film2);

        List<Film> films = filmService.getAllFilms(null);

        assertEquals(2, films.size());
    }

    @Test
    void testGetFilmByEidr() {
        Film film1 = new Film("Film 1", "EIDR-1", new HashSet<>(Arrays.asList("Action", "Adventure")), 4.5, 2020, true);
        filmService.addFilm(film1);

        Film foundFilm = filmService.getFilmByEidr("EIDR-1");

        assertNotNull(foundFilm);
        assertEquals("Film 1", foundFilm.getName());
    }

    @Test
    void testAddFilm() {
        Film film = new Film("Film 1", "EIDR-1", new HashSet<>(Arrays.asList("Action", "Adventure")), 4.5, 2020, true);

        filmService.addFilm(film);

        List<Film> films = filmService.getAllFilms(null);
        assertEquals(1, films.size());
        assertEquals("Film 1", films.get(0).getName());
    }

    @Test
    void testUpdateFilmStatus() {
        Film film = new Film("Film 1", "EIDR-1", new HashSet<>(Arrays.asList("Action", "Adventure")), 4.5, 2020, true);
        filmService.addFilm(film);

        filmService.updateFilmStatus("EIDR-1", false);

        Film updatedFilm = filmService.getFilmByEidr("EIDR-1");
        assertFalse(updatedFilm.isActive());
    }

    @Test
    void testDeleteFilm() {
        Film film = new Film("Film 1", "EIDR-1", new HashSet<>(Arrays.asList("Action", "Adventure")), 4.5, 2020, true);
        filmService.addFilm(film);

        filmService.deleteFilm("EIDR-1");

        Film deletedFilm = filmService.getFilmByEidr("EIDR-1");
        assertNull(deletedFilm);
    }

    @Test
    void testEidrExists() {
        Film film = new Film("Film 1", "EIDR-1", new HashSet<>(Arrays.asList("Action", "Adventure")), 4.5, 2020, true);
        filmService.addFilm(film);

        boolean exists = filmService.eidrExists("EIDR-1");

        assertTrue(exists);
    }
}
