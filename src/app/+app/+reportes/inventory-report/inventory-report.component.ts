import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../shared/report/report.service';

@Component({
  selector: 'app-inventory-report',
  templateUrl: './inventory-report.component.html',
  styleUrls: ['./inventory-report.component.scss']
})
export class InventoryReportComponent implements OnInit {

  private inventories;

  request: {
    branch_id:number,
    product_id:number,
    quantity:number,
    price:number,
    minimum:string,
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
      minimum:null
    };
  }

  submit(){
    this.reportService.getInventory(this.request).subscribe(
      inventories => this.inventories = inventories
    )
  }
}
