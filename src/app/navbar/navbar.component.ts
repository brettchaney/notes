import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotesService } from '../notes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  newNoteId: number;
  private newId: Subscription;

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.newId = this.notesService.noteNewId.subscribe(
      (id: number) => (this.newNoteId = id)
    );
  }

  ngOnDestroy(): void {
    this.newId.unsubscribe();
  }
}
