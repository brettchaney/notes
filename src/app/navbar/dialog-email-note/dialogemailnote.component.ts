import { Component, Inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-dialog-email-note',
  templateUrl: './dialogemailnote.component.html',
  styleUrls: ['./dialogemailnote.component.scss'],
})
export class DialogEmailNoteComponent {
  emailForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  isDisabled: boolean = false;
  inProgress: boolean = false;
  isSuccessful: boolean = false;
  isError: boolean = false;
  isEmpty: boolean = false;
  noteData = this.data;
  currentEmail: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService: DataService,
    private fb: FormBuilder
  ) {}

  onSubmit(): void {
    if (this.emailForm.valid) {
      this.noteData.email = this.emailForm.value.email;
      this.isDisabled = true;
      this.inProgress = true;
      this.isError = false;
      this.isEmpty = false;
      this.emailForm.get('email').disable();

      this.dataService.emailNote(this.noteData).subscribe(
        (val) => {
          this.resetForm();
          this.isSuccessful = true;
          this.currentEmail = this.emailForm.get('email').value;
        },
        (response) => {
          this.resetForm();
          this.emailForm.patchValue({
            email: '',
          });
          this.isError = true;
          console.warn('POST call in error', response);
        },
        () => {
          console.warn('The POST observable is now completed.');
        }
      );
    } else {
      this.isEmpty = true;
    }
  }

  resetForm(): void {
    this.isDisabled = false;
    this.inProgress = false;
    this.emailForm.get('email').enable();
  }
}
