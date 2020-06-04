import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { DataService } from '../data.service';
import { NotesService } from '../notes.service';
import { INote } from '../inote';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit, OnDestroy {
  private getNotesSub: Subscription;

  noteForm: FormGroup;
  currentNote: INote;
  notes: Array<INote>;
  paramId: number;
  isNewNote: any;
  notesLoaded: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private notesService: NotesService
  ) {}

  ngOnInit(): void {
    this.noteForm = new FormGroup({
      title: new FormControl(),
      body: new FormControl(),
      id: new FormControl(),
    });

    this.route.paramMap.subscribe((params) => {
      this.paramId = parseInt(params.get('id'));
      this.isNewNote = this.route.snapshot.paramMap.get('newnote');

      // this.notesService.activatedNote.next(this.paramId);

      if (this.isNewNote) {
        this.notesService.activatedNote.next();
        this.newNoteView();
      } else {
        // check if note is available
        if (typeof this.notesService.getNote(this.paramId)[0] === 'object') {
          this.currentNote = this.notesService.getNote(this.paramId)[0];
          this.notesService.activatedNote.next(this.currentNote);
          this.updateView();
        } else {
          this.getNotesSub = this.notesService.notesChanged.subscribe(
            (notes) => {
              this.currentNote = this.notesService.getNote(this.paramId)[0];
              this.notesService.activatedNote.next(this.currentNote);
              this.updateView();
            }
          );
        }
      }
    });
  }

  newNoteView(): void {
    this.noteForm.setValue({
      title: 'No title',
      body: '',
      id: this.paramId,
    });
  }

  updateView(): void {
    this.noteForm.setValue({
      title: this.currentNote.title,
      body: this.currentNote.body,
      id: this.currentNote.id,
    });
  }

  updateNoteEvt(): void {
    this.notesService.activatedNote.next(this.currentNote);

    this.noteForm.patchValue({
      title: !this.noteForm.value.title
        ? 'No title'
        : this.noteForm.value.title,
    });

    if (this.isNewNote) {
      this.currentNote = {
        title: this.noteForm.value.title,
        body: this.noteForm.value.body,
        id: this.noteForm.value.id,
      };
      this.dataService.createNote(this.currentNote);
      this.isNewNote = false;
    } else {
      // if no key is found in current note
      // then find key for note in notes service array
      this.notes = this.notesService.getNotes();

      if (typeof this.currentNote.key === 'undefined') {
        this.currentNote.key = this.notes.filter((note) => {
          return note.id === this.paramId;
        })[0]['key'];
      }

      this.dataService
        .updateNote(this.currentNote.key, this.noteForm.value)
        .catch((err) => console.log(err));
    }
  }

  ngOnDestroy(): void {
    this.notesService.activatedNote.next();

    if (this.getNotesSub) {
      this.getNotesSub.unsubscribe();
    }
  }
}
