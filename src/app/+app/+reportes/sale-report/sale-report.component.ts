import { Component, OnInit } from '@angular/core';
import {ReportService} from "../../../shared/report/report.service";
import {NotifyService} from "../../../services/notify.service";
import {TicketService} from "../../+venta/ticket/ticket.service";
import {messages} from "../../../shared/messages";

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

  totalPriceSale;

  constructor(private reportService:ReportService,
              private notify:NotifyService,
              private ticketService:TicketService) { }

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
      sales => {
        this.sales = sales;

        this.totalPriceSale = 0;
        sales.forEach(sale => {
          this.totalPriceSale += sale.total;
        });

        if (!this.sales.length) {
          this.notify.alert(messages.report.voidBody, messages.report.voidTitle)
        }
      },
      error => this.notify.serviceError(error)
    )
  }

  print(sale){
    this.ticketService.putSale(sale);
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
