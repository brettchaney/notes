import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotelistitemComponent } from './notelistitem.component';

describe('NotelistitemComponent', () => {
  let component: NotelistitemComponent;
  let fixture: ComponentFixture<NotelistitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotelistitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotelistitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
