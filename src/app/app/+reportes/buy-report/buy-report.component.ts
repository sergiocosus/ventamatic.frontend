import { Component, OnInit } from '@angular/core';
import {ReportService} from "../../../shared/report/report.service";
import {NotifyService} from "../../../services/notify.service";
import {messages} from "../../../shared/messages";
import {IMyDateRangeModel} from 'mydaterangepicker';

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

  rangeOptions = {
    editableDateRangeField: true
  };

  totalCostBuy = 0;
  totalProducts: number;

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

  onDateRangeChanged($event: IMyDateRangeModel) {
    this.reportService.formatRange(this.request, $event);
  }

  submit(){
    this.reportService.getBuy(this.request).subscribe(
      buys => {
        this.buys = buys;

        this.totalCostBuy = 0;
        this.totalProducts = 0;
        buys.forEach(buy => {
          this.totalCostBuy += buy.total;
          buy.products.forEach(
            product => {
              this.totalProducts += product.pivot.quantity;
            }
          )
        });

        if (!this.buys.length) {
          this.notify.alert(messages.report.voidBody, messages.report.voidTitle)
        }
      },
      error => this.notify.serviceError(error)
    )
  }


  downloadCSV(){
    let rows = [];
    this.buys.forEach(
      buy => {
        const saleData = {
          id_compra: buy.id,
          fecha_hora: this.reportService.formatDateTime(buy.created_at),
          fecha: this.reportService.formatDate(buy.created_at),
          hora: this.reportService.formatTime(buy.created_at),
          id_usuario: buy.user_id,
          usuario_nombre: buy.user.name,
          usuario_apellido_paterno: buy.user.last_name,
          usuario_apellido_materno: buy.user.last_name_2,
          id_proveedor: buy.supplier.id,
          proveedor_nombre: buy.supplier.name,
          sucursal_id: buy.branch_id,
          sucursal_nombre: buy.branch.name,
          tipo_de_pago_id: buy.payment_type_id,
          pago_de_tarjeta_id: buy.card_payment_id,
          iva: buy.iva,
          ieps: buy.ieps,
        };

        buy.products.forEach(product => {
          rows.push(Object.assign({}, saleData, {
            id_producto: product.id,
            producto_nombre: product.description,
            cantidad: product.pivot.quantity,
            costo: product.pivot.cost,
            total: product.pivot.cost * product.pivot.quantity,
            id_tipo_movimiento_inventario: product.pivot.inventory_movement_type_id
          }));
        });
      }
    );

    this.reportService.downloadCSV(rows,`compras-${new Date().toISOString()}`);
  }
}
