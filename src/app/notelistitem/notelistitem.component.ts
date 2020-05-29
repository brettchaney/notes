import { Component, Input } from '@angular/core';

import { NotesService } from '../notes.service';
import { INote } from '../inote';

@Component({
  selector: 'app-notelistitem',
  templateUrl: './notelistitem.component.html',
  styleUrls: ['./notelistitem.component.scss'],
})
export class NotelistitemComponent {
  @Input() note: INote;

  x: number;

  constructor(private notesService: NotesService) {}

  onPan(event: any): void {
    this.x = event.x;
  }

  deleteNote(): void {
    this.notesService
      .deleteNote(this.note.key)
      .catch((err) => console.log(err));
  }
}
