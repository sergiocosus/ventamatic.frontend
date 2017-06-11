import { Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Product} from '../../product/classes/product';
import {ProductService} from '../../product/services/product.service';
import {NotifyService} from '../../shared/services/notify.service';
import {MdDialog} from '@angular/material';
import {ProductDialogComponent} from '../../product/components/product-dialog/product-dialog.component';
import {BasicEntityDialogComponent} from '../../various/components/basic-entity-dialog/basic-entity-dialog.component';


@Component({
  selector: 'app-productos',
  templateUrl: 'productos.component.html',
  styleUrls: ['productos.component.scss']
})
export class ProductosComponent implements OnInit {
  public products: Product[];
  public deletedControl = new FormControl();

  constructor(private productService: ProductService,
              private notify: NotifyService,
              private dialog: MdDialog) {
    this.deletedControl.valueChanges.subscribe(
      showDeleted => this.loadProducts()
    );
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.products = [];
    const params = {
      deleted: this.deletedControl.value
    };

    this.productService.getAll(params).subscribe(
      products => this.products = products,
      error => this.notify.serviceError(error)
    );
  }

  clickUpdate(product: Product) {
    this.update(product);
  }

  clickDelete($event, product: Product) {
    $event.preventDefault();
    $event.stopPropagation();
    this.delete(product);
  }

  clickRestore($event, product: Product) {
    $event.preventDefault();
    $event.stopPropagation();

    this.productService.restore(product.id).subscribe(
      productRestored => {
        const index = this.products.indexOf(product);
        if (index > -1) {
          this.products[index] = productRestored;
        }

        this.notify.success('Producto restaurado');
      },
      error => this.notify.serviceError(error)
    );
  }

  clickCreate() {
    this.create();
  }

  update(product: Product) {
    const dialog = this.dialog.open(ProductDialogComponent);
    dialog.componentInstance.initUpdate(product);
    dialog.componentInstance.updated.subscribe(updatedProduct => {
      for (let i = 0; i < this.products.length; i++) {
        if (updatedProduct.id === this.products[i].id) {
          this.products[i] = updatedProduct;
        }
      }
    });
  }

  create() {
    const dialog = this.dialog.open(ProductDialogComponent);
    dialog.componentInstance.initCreate();
    dialog.componentInstance.created.subscribe(product => {
      this.products.push(product);
    });
  }

  delete(product: Product) {
    const dialog = this.dialog.open(ProductDialogComponent);
    dialog.componentInstance.initDelete(product);
    dialog.componentInstance.deleted.subscribe(deletedProduct => {
      const index = this.products.indexOf(deletedProduct);
      if (index > -1) {
        if (this.deletedControl.value) {
          this.products[index].deleted_at = ' ';
        } else {
          this.products.splice(index, 1);
        }
      }
    });
  }

  openCategoryDialog() {
    const dialog = this.dialog.open(BasicEntityDialogComponent);
    dialog.componentInstance.init('category');
  }

  openBrandDialog() {
    const dialog = this.dialog.open(BasicEntityDialogComponent);
    dialog.componentInstance.init('brand');
  }
}
