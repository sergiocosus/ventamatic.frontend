import { Component, OnInit } from '@angular/core';
import {ReportService} from "../../../shared/report/report.service";

@Component({
  selector: 'app-historic-inventory-report',
  templateUrl: './historic-inventory-report.component.html',
  styleUrls: ['./historic-inventory-report.component.scss']
})
export class HistoricInventoryReportComponent implements OnInit {

  private inventories;

  request: {
    branch_id:number,
    product_id:number,
    quantity:number,
    price:number,
    minimum:number,
    date:string
  };

  constructor(private reportService:ReportService) { }

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
      inventories => this.inventories = inventories
    )
  }

}
