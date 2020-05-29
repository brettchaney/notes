import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoteComponent } from './note/note.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'note/new', component: NoteComponent },
  { path: 'note/:id', component: NoteComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
