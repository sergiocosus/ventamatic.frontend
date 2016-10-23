import { Component, OnInit } from '@angular/core';
import {ReportService} from "../../../shared/report/report.service";

@Component({
  selector: 'app-sale-report',
  templateUrl: './sale-report.component.html',
  styleUrls: ['./sale-report.component.scss']
})
export class SaleReportComponent implements OnInit {

  private sales;

  request:{
    id:number,
    branch_id:number,
    user_id:number,
    client_id:number,
    begin_at:string,
    end_at:string
  };

  constructor(private reportService:ReportService) { }

  ngOnInit() {
    this.resetRequest();
  }

  resetRequest(){
    this.request = {
      id:null,
      branch_id:null,
      user_id:null,
      client_id:null,
      begin_at:null,
      end_at:null
    };
  }

  submit(){
    this.reportService.getSale(this.request).subscribe(
      sales => this.sales = sales
    )
  }
}
