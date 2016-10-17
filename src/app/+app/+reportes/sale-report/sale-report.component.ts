import { Component, OnInit } from '@angular/core';
import {ReportService} from "../../../shared/report/report.service";

@Component({
  selector: 'app-sale-report',
  templateUrl: './sale-report.component.html',
  styleUrls: ['./sale-report.component.scss']
})
export class SaleReportComponent implements OnInit {

  private sales;

  sale_id:number = null;
  branch_id:number = null;
  user_id:number = null;
  client_id:number = null;
  begin_at:string = null;
  end_at:string = null;

  constructor(private reportService:ReportService) { }

  ngOnInit() {

  }

  submit(){
    this.reportService.getSale({
      sale_id: this.sale_id,
      branch_id: this.branch_id,
      user_id: this.user_id,
      client_id: this.client_id,
      begin_at: this.begin_at,
      end_at: this.end_at
    }).subscribe(
      sales => this.sales = sales
    )
  }
}
