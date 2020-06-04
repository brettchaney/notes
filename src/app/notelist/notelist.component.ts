import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { NotesService } from '../notes.service';
import { INote } from '../inote';

@Component({
  selector: 'app-notelist',
  templateUrl: './notelist.component.html',
  styleUrls: ['./notelist.component.scss'],
})
export class NotelistComponent implements OnInit, OnDestroy {
  private newIdSub: Subscription;
  private notesSub: Subscription;

  notes: Array<INote> = [];
  notesMaxId: number;
  positiveMaxId: number;
  notesChecked: boolean = false;
  newNoteId: number;

  constructor(private notesService: NotesService, private router: Router) {}

  ngOnInit(): void {
    this.newIdSub = this.notesService.noteNewId.subscribe(
      (id: number) => (this.newNoteId = id)
    );
    this.getNotes();
  }

  getNotes(): void {
    this.notesSub = this.notesService.notesChanged.subscribe(
      (notes: INote[]) => {
        this.notes = notes;

        this.notesMaxId =
          Math.max.apply(
            Math,
            this.notes.map(function (o) {
              return o.id;
            })
          ) + 1;

        this.positiveMaxId = this.notesMaxId > 0 ? this.notesMaxId : 1;
        this.notesService.noteNewId.next(this.positiveMaxId);

        this.notesChecked = true;
      }
    );
  }

  redirectNote(noteId: number) {
    let index = this.notes.map((e) => e.id).indexOf(noteId);

    if (index === 0) {
      this.router.navigate(['']);
    } else {
      let newSelNoteID: number = this.notes[index - 1].id;
      this.router.navigate(['/note/' + newSelNoteID]);
    }
  }

  ngOnDestroy(): void {
    this.notesSub.unsubscribe();
    this.newIdSub.unsubscribe();
  }
}
