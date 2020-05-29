import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[mnSwipeNote]',
})
export class SwipeNoteDirective {
  @Input() x: number;
  @Output() locationChange = new EventEmitter<any>();

  startX = 0;

  constructor() {}

  @HostListener('panmove', ['$event']) protected onPanMove(event: any) {
    event.preventDefault();
    this.x = this.startX + event.deltaX;

    if (this.x < 75 && this.x > 0) {
      this.locationChange.emit({ x: this.x });
    }
  }

  @HostListener('panstart', ['$event']) protected onPanStart(event: any) {
    event.preventDefault();
    this.startX = this.x;
  }

  @HostListener('panend', ['$event']) protected onPanEnd(event: any) {
    event.preventDefault();

    if (event.additionalEvent === 'panright') {
      this.locationChange.emit({ x: 50 });
    } else {
      this.locationChange.emit({ x: 0 });
    }
  }
}
