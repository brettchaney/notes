import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  newNoteId: boolean;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.fetchNotes().subscribe();
  }

  assignId(id) {
    this.newNoteId = id;
  }
}
