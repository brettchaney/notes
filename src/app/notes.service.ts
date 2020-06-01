import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { INote } from './inote';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private dbPath = '/notes';
  noteNewId = new BehaviorSubject<number>(1);
  notesRef: AngularFireList<INote> = null;

  constructor(private db: AngularFireDatabase) {
    this.notesRef = db.list(this.dbPath);
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
