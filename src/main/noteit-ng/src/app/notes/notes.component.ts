import { Component, OnInit } from '@angular/core';
import {Notebook} from "./model/notebook";
import {ApiService} from "../shared/api.service";
import {Note} from "./model/note";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notebooks: Notebook[] = [];
  notes: Note[] = [];
  selectedNotebook: Notebook;
  searchText: string;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getAllNotebooks();
    this.getAllNotes();
  }

  getAllNotebooks() {
    this.apiService.getAllNotebooks().subscribe(
      res => {
        this.notebooks = res;
      },
      error => {alert('Error while fetching data from database')}
    );
  }

  selectNotebook(selectedNotebook: Notebook) {
    this.selectedNotebook = selectedNotebook;
    this.apiService.getNotesByNotebook(selectedNotebook.id).subscribe(
      res => {
        this.notes = res;
      },
      error => {alert('An error has occurred while fetching notes for selected notebook')}
    )
  }

  createNotebook() {
    let notebook: Notebook = {
      id: null,
      name: 'New notebook',
      numberOfNotes: 0
    };
    this.apiService.postNotebook(notebook).subscribe(
      res => {
        notebook.id = res.id;
        this.notebooks.push(notebook);
      },
      error => {alert('An error has occurred while saving the notebook')}
    );
  }

  updateNotebook(notebookToBeUpdated: Notebook) {
    this.apiService.postNotebook(notebookToBeUpdated).subscribe(
      res => {},
      error => {alert('An error has occurred while saving the notebook')}
    );
  }

  deleteNotebook(notebookToBeDeleted: Notebook) {
    if (confirm('Are you sure you want to delete this Notebook?')){
      this.apiService.deleteNotebook(notebookToBeDeleted.id).subscribe(
        res => {
          let indexOfNotebook = this.notebooks.indexOf(notebookToBeDeleted);
          this.notebooks.splice(indexOfNotebook, 1);
        },
        error => {alert('Could not delete selected Notebook')}
      )
    }
  }

  getAllNotes() {
    this.apiService.getAllNotes().subscribe(
      res => {
        this.notes = res
      },
      error => {alert('Error occurred while fetching Notes')}
    )
  }

  selectAllNotes() {
    this.selectedNotebook = null;
    this.getAllNotes();
  }

  createNote(id: string) {
    let newNote: Note = {
      id: null,
      title: 'New note',
      text: "Write your note here",
      lastModifiedOn: null,
      notebookId: id
    };
    this.apiService.saveNote(newNote).subscribe(
      res => {
        newNote.id = res.id;
        this.notes.push(newNote);
      },
      error => {alert('An error occurred while saving the note')}
    )
  }

  updateNote(noteToBeUpdated: Note) {
    this.apiService.saveNote(noteToBeUpdated).subscribe(
      res => {
      },
      error => {alert('An error occurred while saving the note')}
    )
  }

  deleteNote(noteToBeDeleted: Note) {
    if (confirm('Are you sure you want to delete this note?')){
      this.apiService.deleteNote(noteToBeDeleted.id).subscribe(
        res => {
          let indexOfNote = this.notes.indexOf(noteToBeDeleted);
          this.notes.splice(indexOfNote, 1);
        },
        error => {alert('An error has occurred while deleting the note')}
      )
    }
  }
}
