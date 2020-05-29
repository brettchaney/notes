import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

import { NotesService } from '../notes.service';
import { INote } from '../inote';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {
  noteForm: FormGroup;
  note: INote;
  paramId: number;
  isNewNote;

  constructor(
    private route: ActivatedRoute,
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
        this.newNoteSetup();
      } else {
        this.getNote();
      }
    });
  }

  newNoteSetup() {
    this.noteForm.setValue({
      body: '',
      id: this.paramId,
      title: '',
    });

    this.note = {
      body: this.noteForm.value.body,
      id: this.noteForm.value.id,
      title: 'No title',
    };

    this.updateNote();
  }

  getNote(): void {
    this.notesService
      .getNotes()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((notes) => {
        this.note = notes.find((obj) => obj.id === this.paramId);

        this.noteForm.setValue({
          title: this.note.title,
          body: this.note.body,
          id: this.note.id,
        });
      });
  }

  updateNote(): void {
    if (this.isNewNote) {
      this.notesService.createNote(this.note);
      this.isNewNote = false;
      this.getNote();
    } else {
      this.noteForm.patchValue({
        title: !this.noteForm.value.title
          ? 'No title'
          : this.noteForm.value.title,
      });
      this.notesService
        .updateNote(this.note.key, this.noteForm.value)
        .catch((err) => console.log(err));
    }
  }
}
