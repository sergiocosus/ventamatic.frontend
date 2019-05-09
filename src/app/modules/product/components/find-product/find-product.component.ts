import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Inventory } from '@app/api/models/inventory.model';
import { InventoryService } from '@app/api/services/inventory.service';
import { Observable } from 'rxjs';
import { Product } from '@app/api/models/product';
import { ProductService } from '@app/api/services/product.service';
import { NotifyService } from '@app/shared/services/notify.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-find-product',
  templateUrl: './find-product.component.html',
  styleUrls: ['./find-product.component.scss']
})
export class FindProductComponent implements OnInit {
  @ViewChild('barCodeInput') barCodeInput: ElementRef;

  @Output() selectedProduct = new EventEmitter();
  @Input() tab_index: number;
  @Input() branch_id: number;
  @Input() mode = 'inventory';

  searchMethod: (string) => Observable<Product | Inventory>;
  barCodeMethod: (string) => Observable<Product | Inventory>;
  productIdMethod: (number) => Observable<Product | Inventory>;

  private messages = {
    emptyBarCode: 'El código de barras se encuentra vacío',
    emptyId: 'El ID se encuentra vacío',
  };
  form: FormGroup;

  constructor(private inventoryService: InventoryService,
              private productService: ProductService,
              private notifyService: NotifyService,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      bar_code: [],
      product_id: [],
      search: [''],
    });

    this.form.get('search').valueChanges
      .pipe(filter(product => product instanceof Product || product instanceof Inventory))
      .subscribe(product => this.selectProduct(product));
  }

  selectProduct(product) {
    this.selectedProduct.emit(product);
    this.clear();
  }

  private productIdEntered() {
    const product_id = this.form.get('product_id').value;
    if (!isNaN(product_id)) {
      this.productIdMethod(product_id).subscribe(
        inventory => this.selectProduct(inventory),
        error => this.notifyError(error)
      );
    } else {
      this.notifyService.alert('Alerta', this.messages.emptyId);
    }
  }

  barCodeEntered() {
    const bar_code = this.form.get('bar_code').value;
    if (bar_code && bar_code.length) {
      this.barCodeMethod(bar_code).subscribe(
        inventory => this.selectProduct(inventory),
        error => this.notifyError(error)
      );
    } else {
      this.notifyService.alert('Alerta', this.messages.emptyBarCode);
    }
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

  private initProductMethods() {
    this.searchMethod = (words) => this.productService.search(words);
    this.barCodeMethod = (barCode) => this.productService.getByBarCode(barCode);
    this.productIdMethod = (product_id) => this.productService.get(product_id);
  }

  notifyError(error) {
    if (error.code === 10) {
      this.notifyService.alert('Alerta', error.message);
    } else {
      this.notifyService.error('Error', error.message);
    }
  }

  clear() {
    this.form.reset({
      bar_code: '',
      search: '',
      product_id: null,
    });
  }

  setFocus() {
    this.barCodeInput.nativeElement.focus();
  }
}
