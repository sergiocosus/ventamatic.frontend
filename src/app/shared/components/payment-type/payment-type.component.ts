import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-payment-type',
  templateUrl: 'payment-type.component.html',
  styleUrls: ['payment-type.component.scss']
})
export class PaymentTypeComponent implements OnInit {
  @Input() tab_index;

  @Input() paymentTypeIdControl: FormControl;
  @Input() cardPaymentIdControl: FormControl;

  constructor() {
  }

  ngOnInit() {
  }

}
