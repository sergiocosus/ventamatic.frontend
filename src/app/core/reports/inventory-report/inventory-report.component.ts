import {Component, OnInit, ViewChild} from '@angular/core';
import {ReportService} from '../../../report/report.service';
import {NotifyService} from '../../../shared/services/notify.service';
import {Category} from '../../../category/category';
import {messages} from '../../../shared/classes/messages';
import {MdPaginator, MdSort} from '@angular/material';
import {ReportDataSource} from '../../../report/classes/report-data-source';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-inventory-report',
  templateUrl: './inventory-report.component.html',
  styleUrls: ['./inventory-report.component.scss'],
})
export class InventoryReportComponent implements OnInit {
  @ViewChild(MdPaginator) paginator: MdPaginator;
  @ViewChild(MdSort) sort: MdSort;

  dataSourceObservable: Observable<any[]>;

  inventories = [];

  request: {
    branch_id: number,
    product_id: number,
    quantity: number,
    price: number,
    minimum: string,
  };

  registeredProducts = null;
  productsWithExistences = null;
  priceValue = 0;
  costValue = 0;

  dataSource: ReportDataSource | null;

  constructor(private reportService: ReportService,
              private notify: NotifyService) { }


  ngOnInit() {
    this.resetRequest();
    this.dataSource = new ReportDataSource(
      this.paginator,
      this.sort,
      (a, b) => {
        switch (this.sort.active) {
          case 'branch': return [a.branch.name, b.branch.name, 'string'];
          case 'id': return [a.product.id, b.product.id, 'number'];
          case 'bar_code': return [a.product.bar_code, b.product.bar_code, 'string'];
          case 'product': return [a.product.description, b.product.description, 'string'];
          case 'category': return [a.product.toStringCategories(), b.product.toStringCategories(), 'string'];
          case 'brand': return [
            (a.product.brand ? a.product.brand.name: ''),
            (b.product.brand ? b.product.brand.name: ''),
            'string'
          ];
          case 'quantity': return [a.quantity, b.quantity, 'number'];
          case 'price': return [a.current_price, b.current_price, 'number'];
          case 'total_price': return [a.totalPrice, b.totalPrice, 'number'];
          case 'averageCost': return [a.averageCost, b.averageCost, 'number'];
          case 'total_cost': return [a.current_total_cost, b.current_total_cost, 'number'];
          case 'last_cost': return [a.last_cost, b.last_cost, 'number'];
          case 'margin': return [a.margin, b.margin, 'number'];
          case 'minimum': return [a.current_minimum, b.current_minimum, 'number'];
        }
      });

    this.dataSourceObservable = this.dataSource.connect();

  }

  resetRequest() {
    this.request = {
      branch_id: null,
      product_id: null,
      quantity: null,
      price: null,
      minimum: null
    };
  }

  implode(categories: Category[]) {
    return categories.map(category => category.name)
      .join(', ');
  }

  resetStats() {
    this.registeredProducts = 0;
    this.productsWithExistences = 0;
    this.priceValue = 0;
    this.costValue = 0;
  }

  submit() {
    this.reportService.getInventory(this.request).subscribe(
      inventories => {
        this.inventories = inventories;
        this.resetStats();
        if (!this.inventories.length) {
          this.notify.alert(messages.report.voidBody, messages.report.voidTitle);
        }

        const inventoryIds = [];
        inventories.forEach( inventory => {
          this.calculateInventory(inventory);

          if (inventoryIds.indexOf(inventory.product_id) === -1) {
            inventoryIds.push(inventory.product_id);
          }

          if (inventory.quantity > 0) {
            this.productsWithExistences++;
          }

          inventory.totalPrice = inventory.current_price * inventory.quantity;

          this.priceValue += inventory.totalPrice;
          this.costValue += inventory.current_total_cost;
        });

        this.registeredProducts = inventoryIds.length;

        this.dataSource.setData(inventories);
      },
      error => this.notify.serviceError(error)
    );
  }

  calculateInventory(inventory: any) {
    inventory.categoryString = inventory.product.toStringCategories();
    inventory.subtotalPrice = inventory.quantity * inventory.current_price;
    inventory.averageCost = inventory.current_total_cost / inventory.quantity;

    const margin = (inventory.current_price - inventory.averageCost) / inventory.averageCost;
    if (Number.isFinite(margin) && !Number.isNaN(margin)) {
      inventory.margin = margin;
    }
  }

  downloadCSV() {
    this.reportService.downloadCSV(this.inventories.map(
      inventory => ({
        sucursal_id: inventory.branch_id,
        sucursal_nombre: inventory.branch.name,
        producto_id: inventory.product_id,
        codigo_barras: inventory.product.bar_code,
        producto_descripcion: inventory.product.description,
        minimo: inventory.minimum,
        cantidad: inventory.quantity,
        precio: inventory.current_price,
        precio_total: inventory.price * inventory.quantity,
        costo: inventory.current_total_cost,
      })
    ), `inventario-${new Date().toISOString()}`);
  }
}

