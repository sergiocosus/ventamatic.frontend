import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../shared/report/report.service';
import {NotifyService} from "../../../services/notify.service";
import {messages} from "../../../shared/messages";

@Component({
  selector: 'app-inventory-report',
  templateUrl: './inventory-report.component.html',
  styleUrls: ['./inventory-report.component.scss']
})
export class InventoryReportComponent implements OnInit {
  private inventories = [];

  request: {
    branch_id:number,
    product_id:number,
    quantity:number,
    price:number,
    minimum:string,
  };

  constructor(private reportService:ReportService,
              private notify:NotifyService) { }

  registeredProducts = null;
  productsWithExistences = null;

  ngOnInit() {
    this.resetRequest();
  }

  resetRequest() {
    this.request = {
      branch_id:null,
      product_id:null,
      quantity:null,
      price:null,
      minimum:null
    };
  }

  submit(){
    this.reportService.getInventory(this.request).subscribe(
      inventories => {
        this.inventories = inventories;
        if (!this.inventories.length) {
          this.notify.alert(messages.report.voidBody, messages.report.voidTitle)
        }

        let inventoryIds = [];
        this.productsWithExistences = 0;
        inventories.forEach( inventory => {
          if (inventoryIds.indexOf(inventory.product_id) === -1) {
            inventoryIds.push(inventory.product_id);
          }

          if (inventory.quantity > 0) {
            this.productsWithExistences++;
          }
        });

        this.registeredProducts = inventoryIds.length;
      },
      error => this.notify.serviceError(error)
    )
  }

  downloadCSV(){
    this.reportService.downloadCSV(this.inventories.map(
      inventory => ({
        id: inventory.id,
        sucursal_id: inventory.branch_id,
        producto_id: inventory.product_id,
        cantidad: inventory.quantity,
        precio: inventory.price,
        minimo: inventory.minimum,
        creado: this.reportService.formatDate(inventory.created_at),
        actualizado: this.reportService.formatDate(inventory.updated_at)
      })
    ), `inventario-${new Date().toISOString()}`);
  }
}
