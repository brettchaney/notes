import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotesService } from '../notes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private newIdSub: Subscription;
  newNoteId: number;

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.newIdSub = this.notesService.noteNewId.subscribe(
      (id: number) => (this.newNoteId = id)
    );
  }

  ngOnDestroy(): void {
    this.newIdSub.unsubscribe();
  }
}
