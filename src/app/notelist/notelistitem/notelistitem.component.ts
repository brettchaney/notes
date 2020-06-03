import { Component, Input, Output, EventEmitter } from '@angular/core';

import { DataService } from '../../data.service';
import { INote } from '../../inote';

@Component({
  selector: 'app-notelistitem',
  templateUrl: './notelistitem.component.html',
  styleUrls: ['./notelistitem.component.scss'],
})
export class NotelistitemComponent {
  @Input() note: INote;
  @Output() selectedNoteId = new EventEmitter<number>();
  x: number;

  constructor(private dataService: DataService) {}

  onPan(event: any): void {
    this.x = event.x;
  }

  deleteNote(): void {
    this.dataService.deleteNote(this.note.key).catch((err) => console.log(err));

    this.selectedNoteId.emit(this.note.id);
  }
}
