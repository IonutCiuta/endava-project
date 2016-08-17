package com.endava.wikiexplorer.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.List;

/**
 * Created by aciurea on 8/17/2016.
 */
@Entity
public class Query {
    @Override
    public String toString() {
        return "Query{" +
                "id=" + id +
                ", titles=" + titles +
                '}';
    }

    @Id
    Long id;

    String titles;

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitles(String titles) {
        titles = titles;
    }

    public Long getId() {

        return id;
    }

    public String getTitles() {
        return titles;
    }
}
