import { Component, OnInit, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'floating-label',
  templateUrl: 'floating-label.component.html',
  styleUrls: ['floating-label.component.css']
})
export class FloatingLabelComponent implements OnInit {
  @Input() label:string;
  
  constructor() {}

  ngOnInit() {
  }

}
