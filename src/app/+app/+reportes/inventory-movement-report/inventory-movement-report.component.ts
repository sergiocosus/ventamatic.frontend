import { Component, OnInit } from '@angular/core';
import {ReportService} from "../../../shared/report/report.service";

@Component({
  selector: 'app-inventory-movement-report',
  templateUrl: './inventory-movement-report.component.html',
  styleUrls: ['./inventory-movement-report.component.scss']
})
export class InventoryMovementReportComponent implements OnInit {

  private inventory_movements;

  request:{
    product_id:number,
    branch_id:number,
    user_id:number,
    inventory_movement_type_id:number,
    begin_at:string,
    end_at:string
  };

  constructor(private reportService:ReportService) { }

  ngOnInit() {
    this.resetRequest();
  }

  resetRequest(){
    this.request = {
      product_id:null,
      branch_id:null,
      user_id:null,
      inventory_movement_type_id:null,
      begin_at:null,
      end_at:null
    };
  }

  submit(){
    this.reportService.getInventoryMovements(this.request).subscribe(
      inventory_movements => this.inventory_movements = inventory_movements
    )
  }

}
