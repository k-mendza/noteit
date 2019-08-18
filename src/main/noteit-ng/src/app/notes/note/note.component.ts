import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Note} from "../model/note";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  @Input() note: Note;
  @Output() noteUpdated = new EventEmitter<Note>();
  @Output() noteDeleted = new EventEmitter<Note>();

  constructor() { }

  ngOnInit() {
  }

  updateNote() {
    this.noteUpdated.emit(this.note);
  }

  deleteNote() {
    this.noteDeleted.emit(this.note);
  }
}
