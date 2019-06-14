import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-button',
  templateUrl: './loading-button.component.html',
  styleUrls: ['./loading-button.component.scss']
})
export class LoadingButtonComponent implements OnInit {
  @Input() type = 'submit';
  @Input() color = 'primary';
  @Input() loading = false;
  @Input() disabled = false;

  constructor() { }

  ngOnInit() {
  }

}
