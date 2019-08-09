package com.karmen.noteit.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.util.Date;
import java.util.UUID;

@Data
@Entity
public class Note {

    @Id
    private UUID id;
    private String title;
    private String text;

    @ManyToOne(fetch = FetchType.LAZY)
    private Notebook notebook;

    private Date lastModifiedDate;

    protected Note() {
        this.id = UUID.randomUUID();
        this.lastModifiedDate = new Date();
    }
}
