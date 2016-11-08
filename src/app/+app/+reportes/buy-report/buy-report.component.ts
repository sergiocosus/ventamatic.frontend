import { Component, OnInit } from '@angular/core';
import {ReportService} from "../../../shared/report/report.service";
import {NotifyService} from "../../../services/notify.service";
import {messages} from "../../../shared/messages";

@Component({
  selector: 'app-buy-report',
  templateUrl: './buy-report.component.html',
  styleUrls: ['./buy-report.component.scss']
})
export class BuyReportComponent implements OnInit {
  private buys = [];

  request:{
    id:number,
    branch_id:number,
    user_id:number,
    supplier_id:number,
    begin_at:string,
    end_at:string
  };

  constructor(private reportService:ReportService,
              private notify:NotifyService) { }

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
      buys => {
        this.buys = buys;
        if (!this.buys.length) {
          this.notify.alert(messages.report.voidBody, messages.report.voidTitle)
        }
      },
      error => this.notify.serviceError(error)
    )
  }


  downloadCSV(){
    this.reportService.downloadCSV(this.buys.map(
      buy => ({
        id: buy.id,
        tipo_de_pago_id: buy.payment_type_id,
        pago_de_tarjeta_id: buy.card_payment_id,
        iva: buy.iva,
        ieps: buy.ieps,
        total: buy.total,
        creado: this.reportService.formatDate(buy.created_at),
        actualizado: this.reportService.formatDate(buy.updated_at),
        borrado: this.reportService.formatDate(buy.deleted_at)
      })
    ), `compras-${new Date().toISOString()}`);
  }
}
