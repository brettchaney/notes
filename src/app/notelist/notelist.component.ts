import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { NotesService } from '../notes.service';
import { INote } from '../inote';

@Component({
  selector: 'app-notelist',
  templateUrl: './notelist.component.html',
  styleUrls: ['./notelist.component.scss'],
})
export class NotelistComponent implements OnInit {
  notes: INote[] = [];
  notesMaxId: number;

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes(): void {
    this.notesService
      .getNotes()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((notes) => {
        this.notes = notes;

        this.notesMaxId =
          Math.max.apply(
            Math,
            notes.map(function (o) {
              return o.id;
            })
          ) + 1;

        this.notesService.noteNewId.next(this.notesMaxId);
      });
  }
}
