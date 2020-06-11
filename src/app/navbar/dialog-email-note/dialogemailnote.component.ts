import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-dialog-email-note',
  templateUrl: './dialogemailnote.component.html',
  styleUrls: ['./dialogemailnote.component.scss'],
})
export class DialogEmailNoteComponent {
  emailForm: FormGroup = new FormGroup({
    email: new FormControl(),
  });

  noteData = this.data;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService: DataService
  ) {}

  onSubmit() {
    this.noteData.email = this.emailForm.value.email;

    console.warn(this.noteData);
    this.dataService.emailNote(this.noteData);
  }
}
