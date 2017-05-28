import { Component, OnInit, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import { ModalComponent } from "ng2-bs3-modal/ng2-bs3-modal";
//import {SaleRequest} from "../shared/sale.service";

@Component({
  selector: 'sale-confirm-modal',
  templateUrl: 'sale-confirm-modal.component.html',
  styleUrls: ['sale-confirm-modal.component.scss'],
})
export class SaleConfirmModalComponent implements OnInit {
  @ViewChild(ModalComponent) protected modal:ModalComponent;

  @Output() confirmed = new EventEmitter();
  @Input() saleRequest:any;//SaleRequest

  constructor() {}

  ngOnInit() {
  }

  open(){
    this.modal.open();
  }

  close(){
    this.modal.close();
  }

  complete(){
    this.confirmed.emit(null);
    this.close();
  }
}
