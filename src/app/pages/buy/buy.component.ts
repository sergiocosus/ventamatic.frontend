import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ProductBuy } from '@app/api/interfaces/product-buy.model';
import { BeginBuyComponent } from '@app/buy/components/begin-buy/begin-buy.component';
import { ConfirmDialogComponent, ConfirmDialogData } from '@app/shared/components/confirm-dialog/confirm-dialog.component';
import { FindProductComponent } from '@app/product/components/find-product/find-product.component';
import { NotifyService } from '@app/shared/services/notify.service';
import { AddProductDialogComponent } from '@app/buy/components/add-product-dialog/add-product-dialog.component';
import { environment } from '../../../environments/environment';
import { BuyService } from '@app/api/services/buy.service';
import { filter } from 'rxjs/operators';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AppValidators } from '@app/shared/app-validators';
import { Product } from '@app/api/models/product';

@Component({
  selector: 'app-compra',
  templateUrl: 'buy.component.html',
  styleUrls: ['buy.component.scss'],
})
export class BuyComponent implements OnInit {
  @ViewChild(FindProductComponent) findProduct: FindProductComponent;
  @ViewChild(BeginBuyComponent) beginBuyModal: BeginBuyComponent;
  @ViewChild('myForm') ngForm: NgForm;

  buyEnvironment = environment.buy;

  messages = {
    success: '¡Compra completada satisfactoriamente!',
    cancel: '¿Está seguro de cancelar la compra?',
    confirm: '¿Está seguro de completar la compra?',
    totalMismatch: 'El total introducido es diferente al total calculado',
    alreadyAddedProduct: 'El producto ya ha sido agregado'
  };
  form: FormGroup;
  firstStepDone: boolean;

  get addedProducts() {
    return this.form.get('products') as FormArray;
  }

  constructor(private buyService: BuyService,
              private notify: NotifyService,
              private dialog: MatDialog,
              private fb: FormBuilder,
              private breakpointObserver: BreakpointObserver) {

    this.form = this.fb.group({
      branch: [null, [Validators.required]],
      supplier: [null, [Validators.required]],
      introduced_amount: [null, []],
      supplier_bill_id: [null, []],
      payment_type_id: [1, [Validators.required]],
      card_payment_id: [null, []],
      total: [],
      products: this.fb.array([], [AppValidators.minLength(1)]),
      iva: [null, [Validators.required]],
      ieps: [null, [Validators.required]],
    });

    if (environment.buy.invoiceTotalRestriction) {
      this.form.get('introduced_amount').setValidators(Validators.required);
    }
  }

  ngOnInit() {
  }


  private createProductForm(productBuy: ProductBuy) {
    return this.fb.group({
      product: [productBuy.product, [Validators.required]],
      cost: [productBuy.cost, [Validators.required]],
      quantity: [productBuy.quantity, [Validators.required]],
      inventory_movement_type: [productBuy.inventory_movement_type, [Validators.required]],
    });
  }


  startBuy(firstStepDone) {
    this.firstStepDone = firstStepDone;
  }

  addProduct(product: Product) {
    this.dialog.open(AddProductDialogComponent, {
      data: {product} as ProductBuy
    }).afterClosed().pipe(filter(Boolean)).subscribe(
      (productBuy) => this.addProductToCart(productBuy)
    );
  }

  findProductBuyInCart(productBuy: ProductBuy) {
    return this.addedProducts.controls.find(addedProduct => {
      if (addedProduct.get('product').value.id === productBuy.product.id &&
        addedProduct.get('inventory_movement_type').value.id === productBuy.inventory_movement_type.id) {
        return true;
      }
    });
  }

  openBuyConfirm() {
    if (this.form.get('introduced_amount').value !== this.total
      && this.buyEnvironment.invoiceTotalRestriction) {
      this.notify.alert(this.messages.totalMismatch);
      return;
    }

    if (this.form.invalid) {
      if (this.form.get('products').hasError('minLength')) {
        this.notify.error('No se han agregado productos');
      }

      this.notify.error('Hay errores o faltan datos');
      return;
    }

    this.dialog.open(ConfirmDialogComponent, {
      data: {
        cancelText: 'Cerrar',
        acceptText: 'Completar Compra'
      } as ConfirmDialogData
    }).afterClosed().pipe(filter(Boolean)).subscribe(
      accepted => this.buy()
    );
  }

  buy() {
    const data = this.form.getRawValue();

    this.buyService.post(data.branch.id, {
      iva: data.iva,
      ieps: data.ieps,
      supplier_id: data.supplier.id,
      supplier_bill_id: data.supplier_bill_id,
      payment_type_id: data.payment_type_id,
      card_payment_id: data.payment_type_id === 2 ? data.card_payment_id : null,
      supplier_bill_total: data.introduced_amount,
      total: this.total,
      products: this.getProductsForRequest(data)
    }).subscribe(
      buy => {
        this.notify.success(this.messages.success);
        this.cancel();
      },
      error => this.notify.serviceError(error)
    );
  }

  addProductToCart(productBuy: ProductBuy) {
    if (!this.findProductBuyInCart(productBuy)) {
      const product = this.createProductForm(productBuy);
      this.addedProducts.push(product);
      this.findProduct.setFocus();
    } else {
      this.notify.alert(this.messages.alreadyAddedProduct);
    }
  }

  private getProductsForRequest(data) {
    return data.products.map(productBuy => ({
        product_id: productBuy.product.id,
        cost: productBuy.cost,
        quantity: productBuy.quantity,
        inventory_movement_type_id: productBuy.inventory_movement_type.id
      })
    );
  }

  get total() {
    const total = this.addedProducts.controls.map(
      form => form.get('cost').value * form.get('quantity').value
    ).reduce((a, b) => a + b, 0);

    return Math.trunc(total * 100) / 100;
  }

  openCancelDialog() {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        cancelText: 'Cancelar Compra',
        acceptText: 'No cancelar compra'
      } as ConfirmDialogData
    }).afterClosed().pipe(filter(Boolean)).subscribe(
      () => this.cancel()
    );
  }

  cancel() {
    this.form.reset({
      client: null,
      payment_type_id: 1,
      card_payment_id: null,
      iva: null,
      ieps: null,
    });

    while (this.addedProducts.length !== 0) {
      this.addedProducts.removeAt(0);
    }

    this.ngForm.resetForm();
    this.firstStepDone = false;
  }
}


