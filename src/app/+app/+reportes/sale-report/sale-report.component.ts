import { Component, OnInit } from '@angular/core';
import {ReportService} from "../../../shared/report/report.service";

@Component({
  selector: 'app-sale-report',
  templateUrl: './sale-report.component.html',
  styleUrls: ['./sale-report.component.scss']
})
export class SaleReportComponent implements OnInit {
  private sales = [];

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

    downloadCSV(){
      this.reportService.downloadCSV(this.sales.map(
        sale => ({
          id: sale.id,
          tipo_de_pago_id: sale.payment_type_id,
          pago_de_tarjeta_id: sale.card_payment_id,
          total: sale.total,
          creado: this.reportService.formatDate(sale.created_at),
          actualizado: this.reportService.formatDate(sale.updated_at),
          borrado: this.reportService.formatDate(sale.deleted_at)
        })
      ), `ventas-${new Date().toISOString()}`);
    }
}
