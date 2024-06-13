package org.example.model;

import java.util.Set;

public class Film {
    private String name;
    private String eidr;
    private Set<String> categories;
    private double rating;
    private int year;
    private boolean active;

    public Film(String name, String eidr, Set<String> categories, double rating, int year, boolean active) {
        this.name = name;
        this.eidr = eidr;
        this.categories = categories;
        this.rating = rating;
        this.year = year;
        this.active = active;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEidr() {
        return eidr;
    }

    public void setEidr(String eidr) {
        this.eidr = eidr;
    }

    public Set<String> getCategories() {
        return categories;
    }

    public void setCategories(Set<String> categories) {
        this.categories = categories;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
