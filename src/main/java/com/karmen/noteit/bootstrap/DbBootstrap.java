package com.karmen.noteit.bootstrap;

import com.karmen.noteit.model.Note;
import com.karmen.noteit.model.Notebook;
import com.karmen.noteit.repository.NoteRepository;
import com.karmen.noteit.repository.NotebookRepository;
import lombok.var;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

@Component
@ConditionalOnProperty(name = "noteit.db.recreate", havingValue = "true")
public class DbBootstrap implements CommandLineRunner {

    private final NotebookRepository notebookRepository;
    private final NoteRepository noteRepository;

    public DbBootstrap(NotebookRepository notebookRepository, NoteRepository noteRepository) {
        this.notebookRepository = notebookRepository;
        this.noteRepository = noteRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // clean db
        this.notebookRepository.deleteAll();
        this.noteRepository.deleteAll();

        // setup default values
        var notebook = new Notebook("Default");
        this.notebookRepository.save(notebook);

        var note = new Note("Hello","Welcome to NoteIt", notebook);
        this.noteRepository.save(note);

        System.out.println("Database initialized");
    }
}
