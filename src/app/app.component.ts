import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  newNoteId: boolean;

  assignId(id) {
    this.newNoteId = id;
  }
}
