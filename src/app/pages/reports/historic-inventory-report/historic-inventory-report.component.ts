import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '@app/api/services/report.service';
import { NotifyService } from '@app/shared/services/notify.service';
import { messages } from '@app/shared/classes/messages';
import { MatPaginator } from '@angular/material';
import { ReportDataSource } from '@app/report/classes/report-data-source';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-historic-inventory-report',
  templateUrl: './historic-inventory-report.component.html',
  styleUrls: ['./historic-inventory-report.component.scss']
})
export class HistoricInventoryReportComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  inventories = [];

  registeredProducts = null;
  productsWithExistences = null;
  priceValue = 0;
  costValue = 0;

  dataSource: ReportDataSource | null;
  form: FormGroup;

  constructor(private reportService: ReportService,
              private notify: NotifyService,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      branch: [],
      product: [],
      quantity: [],
      price: [],
      minimum: [],
      date: []
    });
  }

  ngOnInit() {
    this.dataSource = new ReportDataSource(this.paginator);
  }

  resetStats() {
    this.registeredProducts = 0;
    this.productsWithExistences = 0;
    this.priceValue = 0;
    this.costValue = 0;
  }

  submit() {
    this.reportService.getHistoricInventory(this.form.getRawValue()).subscribe(
      inventories => {
        this.inventories = inventories;
        this.resetStats();

        if (!this.inventories.length) {
          this.notify.alert(messages.report.voidBody, messages.report.voidTitle);
        }

        const inventoryIds = [];
        inventories.forEach(inventory => {
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
        precio: inventory.price,
        precio_total: inventory.price * inventory.quantity,
        costo: 'Pendiente',
      })
    ), `inventario-histórico-${new Date().toISOString()}`);
  }

}
