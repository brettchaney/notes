import { Component, OnInit, OnDestroy } from '@angular/core';

import { NotesService } from '../notes.service';
import { INote } from '../inote';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notelist',
  templateUrl: './notelist.component.html',
  styleUrls: ['./notelist.component.scss'],
})
export class NotelistComponent implements OnInit, OnDestroy {
  private getNotesSub: Subscription;
  notes: INote[] = [];
  notesMaxId: number;

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes(): void {
    this.getNotesSub = this.notesService.getNotes().subscribe((notes) => {
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

  ngOnDestroy(): void {
    this.getNotesSub.unsubscribe();
  }
}
