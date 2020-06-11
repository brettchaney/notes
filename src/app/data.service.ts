import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { INote } from './inote';

import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { NotesService } from './notes.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dbPath = '/notes';
  private sendNoteURL =
    'https://us-central1-notes-ebde4.cloudfunctions.net/sendNoteEmail/';

  notesRef: AngularFireList<INote> = null;

  constructor(
    private db: AngularFireDatabase,
    private notesService: NotesService,
    private http: HttpClient
  ) {
    this.notesRef = db.list(this.dbPath);
  }

  emailNote(note: INote) {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'No-Auth': 'True',
    });

    this.http
      .post(this.sendNoteURL, note, {
        headers: reqHeader,
        responseType: 'text',
      })
      .subscribe(
        (val) => {
          console.log('POST call successful value returned in body', val);
        },
        (response) => {
          console.log('POST call in error', response);
        },
        () => {
          console.log('The POST observable is now completed.');
        }
      );
  }

  createNote(note: INote): void {
    this.notesRef.push(note);
  }

  updateNote(key: string, value: any): Promise<void> {
    return this.notesRef.update(key, value);
  }

  deleteNote(key: string): Promise<void> {
    return this.notesRef.remove(key);
  }

  getNotes() {
    return this.notesRef
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }

  fetchNotes() {
    return this.notesRef.snapshotChanges().pipe(
      map((notes) =>
        notes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
      ),
      tap((notes) => {
        this.notesService.setNotes(notes);
      })
    );
  }

  noteExist(noteid): boolean {
    let exists: boolean;
    this.notesRef.query
      .orderByChild('id')
      .equalTo(noteid)
      .once('value', (snapshot) => {
        exists = snapshot.exists();
      });

    return exists;
  }
}
