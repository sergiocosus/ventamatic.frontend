import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import {AutocompleteInputComponent} from "../../../components/autocomplete-input/autocomplete-input.component";
import {InventoryService} from "../../inventory/inventory.service";
import {NotificationsService} from "angular2-notifications/lib/notifications.service";
import {InputLabelComponent} from "../../../components/input-label/input-label.component";

@Component({
  moduleId: module.id,
  selector: 'app-find-product',
  templateUrl: 'find-product.component.html',
  styleUrls: ['find-product.component.css'],
  directives: [
    AutocompleteInputComponent,
    InputLabelComponent,
  ]
})
export class FindProductComponent implements OnInit {
  @Output('selected-product') selectedProduct = new EventEmitter();

  @Input() branch_id:number;

  bar_code:string;
  product_id:number;
  searchMethod;

  search_words:string = "";

  private messages = {
    emptyBarCode: 'El código de barras se encuentra vacío',
    emptyId: 'El ID se encuentra vacío',
  };

  constructor(private inventoryService:InventoryService,
              private notificationService:NotificationsService
  ) {
    this.initSearchMethod();
  }

  ngOnInit() {
  }

  private initSearchMethod(){
    this.searchMethod = (words) => this.inventoryService.search(this.branch_id, words);
  }

  barCodeEntered($event){
    if($event.keyIdentifier=='Enter'){
      if(this.bar_code && this.bar_code.length){
        this.inventoryService.getByBarCode(this.branch_id, this.bar_code).subscribe(
          inventory => {
            this.selectedProduct.emit(inventory)
          },
          error => this.notifyError(error)
        );
      } else {
        this.notificationService.alert('Alerta', this.messages.emptyBarCode);
      }
    }
  }

  idEntered($event) {
    if ($event.code == 'Enter') {
      if(!isNaN(this.product_id)){
        this.inventoryService.get(this.branch_id, this.product_id).subscribe(
          inventory => this.selectedProduct.emit(inventory),
          error => this.notifyError(error)
        );
      } else {
        this.notificationService.alert('Alerta', this.messages.emptyId);
      }
    }
  }

  notifyError(error){
    if(error.code == 10){
      this.notificationService.alert('Alerta',error.message);
    }else{
      this.notificationService.error('Error', error.message);
    }
  }

  clear(){
    this.bar_code = "";
    this.search_words = "";
    this.product_id = null;
  }
}
