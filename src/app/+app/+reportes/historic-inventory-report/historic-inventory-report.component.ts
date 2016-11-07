import { Component, OnInit } from '@angular/core';
import {ReportService} from "../../../shared/report/report.service";
import {NotifyService} from "../../../services/notify.service";

@Component({
  selector: 'app-historic-inventory-report',
  templateUrl: './historic-inventory-report.component.html',
  styleUrls: ['./historic-inventory-report.component.scss']
})
export class HistoricInventoryReportComponent implements OnInit {
  private inventories = [];

  request: {
    branch_id:number,
    product_id:number,
    quantity:number,
    price:number,
    minimum:number,
    date:string
  };

  constructor(private reportService:ReportService,
              private notify:NotifyService) { }

  ngOnInit() {
    this.resetRequest();
  }

  resetRequest() {
    this.request = {
      branch_id:null,
      product_id:null,
      quantity:null,
      price:null,
      minimum:null,
      date:null
    };
  }

  submit(){
    this.reportService.getHistoricInventory(this.request).subscribe(
      inventories => this.inventories = inventories,
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
    ), `inventario-histórico-${this.request.date}`);
  }

}
