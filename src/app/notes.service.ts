import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

import { INote } from './inote';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private notes: Array<INote> = [];
  notesChanged = new Subject();
  noteNewId = new BehaviorSubject<number>(1);

  constructor() {}

  setNotes(notes: Array<INote>) {
    this.notes = notes;
    this.notesChanged.next(this.notes);
  }

  addNote(note: INote) {
    this.notes.push(note);
    this.notesChanged.next(this.notes.slice());
  }

  updateNote(note: number, newNote: INote) {
    this.notes[note] = newNote;
    this.notesChanged.next(this.notes.slice());
  }

  getNotes() {
    return this.notes.slice();
  }

  getNote(index: number) {
    let note = this.notes.filter((note) => {
      return note.id === index;
    });
    return note;
  }
}
