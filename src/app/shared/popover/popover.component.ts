import {Component, OnInit, HostListener, ElementRef, style, animate, transition, trigger, state} from '@angular/core';

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
  @HostListener('window:click', ['$event.srcElement']) onClick(element) {
    if (!this.elementRef.nativeElement.contains(element)) {
      this.hidden = true;
    }
  }

  @HostListener('keydown', ['$event']) onKeyDown($event) {
    if($event.code == 'Escape'){
      this.hidden = true;
    }
  }

  hidden = true;

  constructor(private elementRef: ElementRef) {
  }

  toggle(){
    this.hidden = !this.hidden;
  }

  ngOnInit() {
  }
}
