import {
  Component, OnInit, HostListener, ElementRef, style, animate, transition, trigger, state,
  Input
} from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({opacity: '0'})),
      transition('void => *', [
        animate(500, style({opacity: '1'}))
      ]),
      transition('* => void', [
        animate(100, style({opacity: '0'}))
      ])
    ])
  ],
})
export class PopoverComponent implements OnInit {
  @Input() focusable;
  hidden = true;

  @HostListener('window:click', ['$event.srcElement']) onClick(element) {
    if (!this.elementRef.nativeElement.contains(element)) {
      this.hidden = true;
    }
  }

  @HostListener('keydown', ['$event']) onKeyDown($event) {
    if ($event.code === 'Escape') {
      this.hidden = true;
    }
  }

  constructor(private elementRef: ElementRef) {
  }

  toggle() {
    this.hidden = !this.hidden;

    if (!this.hidden) {
      if (this.focusable) {
        setTimeout(() => {
          console.log('focus');
          console.log(this.focusable);
          this.focusable.focus();
        }, 100);
      }
    }
  }

  ngOnInit() {
  }
}
