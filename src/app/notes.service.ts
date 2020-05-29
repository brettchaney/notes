import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { INote } from './inote';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private dbPath = '/notes';
  noteNewId = new Subject<number>();

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

  getNotes(): AngularFireList<INote> {
    return this.notesRef;
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
