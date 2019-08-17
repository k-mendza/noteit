import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Notebook} from "./model/notebook";
import {ApiService} from "../shared/api.service";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notebooks: Notebook[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getAllNotebooks();
  }

  getAllNotebooks() {
    this.apiService.getAllNotebooks().subscribe(
      res => {this.notebooks = res},
      error => {alert('Error while fetching data from database')}
    );
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
}
