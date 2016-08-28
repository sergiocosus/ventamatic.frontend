import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-payment-type',
  templateUrl: 'payment-type.component.html',
  styleUrls: ['payment-type.component.scss']
})
export class PaymentTypeComponent implements OnInit {
  @Input() selectedPaymentType = {
    payment_type_id: 1,
    card_payment_id: null,
  };

  paymentTypes = [
    {
      label: 'Efectivo',
      value: 1
    },
    {
      label: 'Tarjeta',
      value: 2
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
