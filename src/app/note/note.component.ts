import { Component, OnInit, OnDestroy } from '@angular/core';
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
  notes: INote[] = [];
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

      if (this.isNewNote) {
        this.newNoteView();
      } else {
        // check if note is available
        if (typeof this.notesService.getNote(this.paramId)[0] === 'object') {
          console.log('note loaded');
          this.currentNote = this.notesService.getNote(this.paramId)[0];
          this.updateView();
        } else {
          this.getNotesSub = this.notesService.notesChanged.subscribe(
            (notes) => {
              console.log('notes updated from subject');
              this.currentNote = this.notesService.getNote(this.paramId)[0];
              this.updateView();
            }
          );
        }
      }
    });
  }

  newNoteView(): void {
    console.log('new note');

    this.noteForm.setValue({
      title: 'No title',
      body: '',
      id: this.paramId,
    });
  }

  updateView(): void {
    console.log('update view: ', this.currentNote);

    this.noteForm.setValue({
      title: this.currentNote.title,
      body: this.currentNote.body,
      id: this.currentNote.id,
    });
  }

  updateNoteEvt(): void {
    console.log('update note');
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
      this.dataService
        .updateNote(this.currentNote.key, this.noteForm.value)
        .catch((err) => console.log(err));
    }
  }

  ngOnDestroy(): void {
    if (this.getNotesSub) {
      this.getNotesSub.unsubscribe();
    }
  }
}
