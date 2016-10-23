import { Component, OnInit } from '@angular/core';
import {ReportService} from "../../../shared/report/report.service";

@Component({
  selector: 'app-buy-report',
  templateUrl: './buy-report.component.html',
  styleUrls: ['./buy-report.component.scss']
})
export class BuyReportComponent implements OnInit {

  private buys;

  request:{
    id:number,
    branch_id:number,
    user_id:number,
    supplier_id:number,
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
      supplier_id:null,
      begin_at:null,
      end_at:null
    };
  }

  submit(){
    this.reportService.getBuy(this.request).subscribe(
      buys => this.buys = buys
    )
  }
}
