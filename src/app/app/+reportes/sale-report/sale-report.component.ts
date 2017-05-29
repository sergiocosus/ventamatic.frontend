import { Component, OnInit } from '@angular/core';
import {ReportService} from "../../../shared/report/report.service";
import {NotifyService} from "../../../services/notify.service";
import {TicketService} from "../../+venta/ticket/ticket.service";
import {messages} from "../../../shared/messages";
import {IMyDateRangeModel} from 'mydaterangepicker';

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

  rangeOptions = {
    editableDateRangeField: true
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

  onDateRangeChanged($event: IMyDateRangeModel) {
    this.reportService.formatRange(this.request, $event);
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
    let rows = [];
    this.sales.forEach(
      sale => {
        const saleData = {
          id_venta: sale.id,
          fecha_hora: this.reportService.formatDateTime(sale.created_at),
          fecha: this.reportService.formatDate(sale.created_at),
          hora: this.reportService.formatTime(sale.created_at),
          id_usuario: sale.user_id,
          usuario_nombre: sale.user.name,
          usuario_apellido_paterno: sale.user.last_name,
          usuario_apellido_materno: sale.user.last_name_2,
          id_cliente: sale.client_id,
          cliente_nombre: sale.client.name,
          cliente_apellido_paterno: sale.client.last_name,
          cliente_apellido_materno: sale.client.last_name_2,
          tipo_de_pago_id: sale.payment_type_id,
          pago_de_tarjeta_id: sale.card_payment_id,
        };

        sale.products.forEach(product => {
          rows.push(Object.assign({}, saleData, {
            id_producto: product.id,
            producto_nombre: product.description,
            cantidad: product.pivot.quantity,
            precio: product.pivot.price,
            total: product.pivot.price * product.pivot.quantity,
          }));
        });
      }
    );

    this.reportService.downloadCSV(rows,`ventas-${new Date().toISOString()}`);
  }
}
