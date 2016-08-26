package com.endava.wikiexplorer.entity;

import javax.persistence.*;

/**
 * Created by aciurea on 8/17/2016.
 */

@Entity
@Table(name = "occurences")
public class Occurrence {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Integer id;

    @ManyToOne
    @JoinColumn(name="query_id")
    private Query query;

    @ManyToOne
    @JoinColumn(name="word_id")
    Word word;

    @Column
    Integer frequency;

    public Occurrence(){

    }

    public Occurrence(Query query, Word word, int frequency){
        this.frequency=frequency;
        this.word=word;
        this.query=query;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Query getQuery() {
        return query;
    }

    public void setQuery(Query query) {
        this.query = query;
    }

    public Word getWord() {
        return word;
    }

    public void setWord(Word word) {
        this.word = word;
    }

    public Integer getFrequency() {
        return frequency;
    }

    public void setFrequency(Integer frequency) {
        this.frequency = frequency;
    }

    @Override
    public String toString() {
        return "Occurrence{" +
                "query=" + query +
                ", word=" + word +
                ", frequency=" + frequency +
                '}';
    }
}