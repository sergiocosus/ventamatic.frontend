import {Component, OnInit, ViewChild, Output, EventEmitter} from '@angular/core';
import {ModalComponent} from "ng2-bs3-modal/components/modal";
import {ProductBuy} from "../../../shared/buy/product-buy";
import {InputLabelComponent} from "../../../components/input-label/input-label.component";

@Component({
  selector: 'app-add-product-modal',
  templateUrl: 'add-product-modal.component.html',
  styleUrls: ['add-product-modal.component.scss']
})
export class AddProductModalComponent implements OnInit {
  @ViewChild(ModalComponent) modal:ModalComponent;
  @ViewChild('inputPrice') inputPrice:InputLabelComponent;

  @Output() completed = new EventEmitter<ProductBuy>();

  productBuy:ProductBuy = {
    product:null,
    quantity:null,
    cost:null
  };

  constructor() { }

  ngOnInit() {
  }

  open(productBuy:ProductBuy){
    this.productBuy = productBuy;
    this.modal.open();
    this.inputPrice.setFocus();
  }

  submit(){
    this.completed.emit(this.productBuy);
    this.modal.close();
  }

}
