import {Component, OnInit, EventEmitter, Output, Input, ViewChild, ElementRef} from '@angular/core';
import {ProductService} from "../product.service";
import { Observable } from "rxjs";
import {Product} from "../product";
import {InputLabelComponent} from "../../../components/input-label/input-label.component";
import {NotificationsService} from 'angular2-notifications';
import {Inventory} from '../../../inventory/classes/inventory.model';
import {InventoryService} from '../../../inventory/services/inventory.service';

@Component({
  selector: 'app-find-product',
  templateUrl: 'find-product.component.html',
  styleUrls: ['find-product.component.scss']
})
export class FindProductComponent implements OnInit {
  @ViewChild('barCodeInput') barCodeInput:InputLabelComponent;
  @Output('selected-product') selectedProduct = new EventEmitter();

  @Input() tab_index: number;
  @Input() branch_id: number;
  @Input() mode: string = 'inventory';

  bar_code: string;
  product_id: number;
  searchMethod: (string) => Observable<Product|Inventory>;
  barCodeMethod: (string) => Observable<Product|Inventory>;
  productIdMethod: (number) => Observable<Product|Inventory>;

  search_words: string = "";

  private messages = {
    emptyBarCode: 'El código de barras se encuentra vacío',
    emptyId: 'El ID se encuentra vacío',
  };

  constructor(private inventoryService: InventoryService,
              private productService: ProductService,
              private notificationService: NotificationsService) {
  }

  ngOnInit() {
    switch (this.mode) {
      case 'inventory':
        this.initInventoryMethods();
        break;
      case 'product':
        this.initProductMethods();
        break;
    }
  }

  private initInventoryMethods() {
    this.searchMethod = (words) => this.inventoryService.search(this.branch_id, words);
    this.barCodeMethod = (barCode) => this.inventoryService.getByBarCode(this.branch_id, barCode);
    this.productIdMethod = (product_id) => this.inventoryService.get(this.branch_id, product_id);
  }

  private initProductMethods(){
    this.searchMethod = (words) => this.productService.search(words);
    this.barCodeMethod = (barCode) => this.productService.getByBarCode(barCode);
    this.productIdMethod = (product_id) => this.productService.get(product_id);
  }

  barCodeEntered($event) {
    if ($event.keyIdentifier == 'Enter') {
      if (this.bar_code && this.bar_code.length) {
        this.barCodeMethod(this.bar_code).subscribe(
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
      if (!isNaN(this.product_id)) {
        this.productIdMethod(this.product_id).subscribe(
          inventory => {
            console.log(inventory);
            this.selectedProduct.emit(inventory)
          },
          error => this.notifyError(error)
        );
      } else {
        this.notificationService.alert('Alerta', this.messages.emptyId);
      }
    }
  }

  notifyError(error) {
    if (error.code == 10) {
      this.notificationService.alert('Alerta', error.message);
    } else {
      this.notificationService.error('Error', error.message);
    }
  }

  clear() {
    this.bar_code = "";
    this.search_words = "";
    this.product_id = null;
  }

  setFocus(){
    this.barCodeInput.setFocus();
  }
}
