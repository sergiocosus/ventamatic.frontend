import {Component, OnInit, ViewChild} from '@angular/core';
import {Product} from '../../shared/product/product';
import {FindProductComponent} from '../../shared/product/find-product/find-product.component';
import {NotifyService} from '../../services/notify.service';
import {MdDialog} from '@angular/material';
import {BeginBuyDataInterface} from 'app/buy/components/begin-buy-modal';
import {BuyService} from 'app/buy/services/buy.service';
import {ProductBuy} from '../../buy/classes/product-buy.model';
import {BeginBuyModalComponent} from '../../buy/components/begin-buy-modal/begin-buy-modal.component';
import {AddProductDialogComponent} from './components/add-product-dialog/add-product-dialog.component';
import {ConfirmDialogComponent} from '../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-compra',
  templateUrl: 'buy.component.html',
  styleUrls: ['buy.component.scss'],
})
export class BuyComponent implements OnInit {
  @ViewChild(FindProductComponent) findProduct: FindProductComponent;
  @ViewChild(BeginBuyModalComponent) beginBuyModal: BeginBuyModalComponent;

  initialData: BeginBuyDataInterface;
  addedProducts: ProductBuy[] = [];
  iva: number;
  ieps: string;

  selectedPaymentType = {
    payment_type_id: 1,
    card_payment_id: null,
  };

  messages = {
    success: '¡Compra completada satisfactoriamente!',
    cancel: '¿Está seguro de cancelar la compra?',
    confirm: '¿Está seguro de completar la compra?',
    totalMismatch: 'El total introducido es diferente al total calculado',
    alreadyAddedProduct: 'El producto ya ha sido agregado'
  };

  constructor(private buyService: BuyService,
              private notify: NotifyService,
              private dialog: MdDialog) {}

  ngOnInit() {
  }

  startBuy(initialData: BeginBuyDataInterface){
    if (initialData && initialData.branch && initialData.supplier
        && initialData.introducedAmount && initialData.supplierBillID) {
      this.initialData = initialData;
    }
  }

  addProduct(product){
    const dialog = this.dialog.open(AddProductDialogComponent);

    dialog.componentInstance.init({
      product: product,
      cost: null,
      quantity: null,
      inventoryMovementType: null
    });

    dialog.componentInstance.completed.subscribe(
      (productBuy) => this.addProductToCart(productBuy)
    );
  }

  findProductBuyInCart(productBuy: ProductBuy) {
    let existProduct: ProductBuy = null;

    this.addedProducts.some(addedProduct => {
      console.log(addedProduct, productBuy);
      if (addedProduct.product.id == productBuy.product.id &&
          addedProduct.inventoryMovementType.id == productBuy.inventoryMovementType.id) {
        existProduct = addedProduct;
        return true;
      }
    });

    return existProduct;
  }

  openBuyConfirm(){
    if (this.initialData.introducedAmount != this.getTotal()) {
      this.notify.error(this.messages.totalMismatch);
    } else {
      const dialog = this.dialog.open(ConfirmDialogComponent);
      dialog.componentInstance.init(this.messages.confirm,
        undefined, 'Completar Compra', 'Cerrar');
      dialog.afterClosed().subscribe(
        accepted => {
          if (accepted) { this.buy(); }
        }
      );
    }
  }

  buy(){
    this.buyService.post(this.initialData.branch.id, {
      iva: this.iva,
      ieps: this.ieps,
      supplier_id: this.initialData.supplier.id,
      supplier_bill_id: this.initialData.supplierBillID,
      payment_type_id: this.selectedPaymentType.payment_type_id,
      card_payment_id: this.selectedPaymentType.card_payment_id,
      total: this.getTotal(),
      products: this.getProductsForRequest()
    }).subscribe(
      buy => {
        this.notify.success(this.messages.success);
        this.cancel();
      },
      error => this.notify.serviceError(error)
    );
  }

  addProductToCart(productBuy: ProductBuy){
    if (!this.findProductBuyInCart(productBuy)) {
      this.addedProducts.push(productBuy);
      this.findProduct.setFocus();
    } else {
      this.notify.alert(this.messages.alreadyAddedProduct);
    }
  }

  private getProductsForRequest() {
    return this.addedProducts.map(
      (productBuy: ProductBuy) => {
        return {
          product_id: productBuy.product.id,
          cost: productBuy.cost,
          quantity: productBuy.quantity,
          inventory_movement_type_id: productBuy.inventoryMovementType.id
        };
      }
    );
  }

  private getTotal(){
    let total = 0;
    this.addedProducts.forEach(
      (productBuy: ProductBuy) => {
        total += productBuy.quantity * productBuy.cost;
      }
    );

    return Math.trunc(total * 100) / 100;
  }

  openCancelDialog() {
    const dialog = this.dialog.open(ConfirmDialogComponent);
    dialog.componentInstance.init(this.messages.cancel,
      undefined, 'Cancelar Compra', 'No cancelar compra');
    dialog.afterClosed().subscribe(
      accepted => {
        if (accepted) { this.cancel(); }
      }
    );
  }

  cancel(){
    this.findProduct.clear();
    this.iva = null;
    this.ieps = null;
    this.addedProducts = [];
    this.beginBuyModal.clear();
    this.initialData = null;
    this.selectedPaymentType.card_payment_id = null;
    this.selectedPaymentType.payment_type_id = 1;
  }
}


