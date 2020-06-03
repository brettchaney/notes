import {
  BrowserModule,
  HammerModule,
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG,
} from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from './navbar/navbar.component';
import { NotelistComponent } from './notelist/notelist.component';
import { NoteComponent } from './note/note.component';
import { HomeComponent } from './home/home.component';
import { SwipeNoteDirective } from './swipe-note.directive';
import { NotelistitemComponent } from './notelist/notelistitem/notelistitem.component';

declare var Hammer: any;

@Injectable()
export class HammerConfig extends HammerGestureConfig {
  buildHammer(element: HTMLElement) {
    let mc = new Hammer(element, {
      touchAction: 'pan-y',
    });
    return mc;
  }
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NotelistComponent,
    NoteComponent,
    HomeComponent,
    SwipeNoteDirective,
    NotelistitemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    HammerModule,
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
