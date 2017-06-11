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
      id: 1
    },
    {
      label: 'Tarjeta',
      id: 2
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
