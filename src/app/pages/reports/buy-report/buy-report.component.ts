import {Component, OnInit, ViewChild} from '@angular/core';
import {IMyDateRangeModel} from 'mydaterangepicker';
import {ReportService} from '@app/api/services/report.service';
import {NotifyService} from '@app/shared/services/notify.service';
import {messages} from '@app/shared/classes/messages';
import {InventoryMovementTypeId} from '@app/api/classes/inventory-movement-type-id.enum';
import {MatPaginator} from '@angular/material';
import {ReportDataSource} from '@app/report/classes/report-data-source';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-buy-report',
  templateUrl: './buy-report.component.html',
  styleUrls: ['./buy-report.component.scss']
})
export class BuyReportComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  buys = [];

  rangeOptions = {
    editableDateRangeField: true
  };

  totalCost = 0;
  totalCostPromotion = 0;
  totalCostBuy = 0;
  totalCostConsignment = 0;
  totalProducts = 0;

  dataSource: ReportDataSource | null;
  form: FormGroup;

  constructor(private reportService: ReportService,
              private notify: NotifyService,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [],
      supplier_bill_id: [],
      branch: [],
      user: [],
      supplier: [],
      begin_at: [],
      end_at: []
    });
  }

  ngOnInit() {
    this.dataSource = new ReportDataSource(this.paginator);
    this.form.reset();
  }

  onDateRangeChanged($event: IMyDateRangeModel) {
    this.reportService.formatRange(this.form.getRawValue(), $event);
  }

  resetStats() {
    this.totalCostBuy = 0;
    this.totalProducts = 0;
    this.totalCost = 0;
    this.totalCostPromotion = 0;
    this.totalCostConsignment = 0;
  }

  submit() {
    this.reportService.getBuy(this.form.getRawValue()).subscribe(
      buys => {
        this.buys = buys;
        this.resetStats();

        buys.forEach(buy => {
          this.totalCost += buy.total;
          buy.products.forEach(
            product => {
              this.totalProducts += product.pivot.quantity;
              switch (product.pivot.inventory_movement_type_id) {
                case InventoryMovementTypeId.Consignacion:
                  console.log(product.pivot);
                  this.totalCostConsignment += product.pivot.quantity * product.pivot.cost;
                  break;
                case InventoryMovementTypeId.Promocion:
                  this.totalCostPromotion += product.pivot.quantity * product.pivot.cost;
                  break;
                case InventoryMovementTypeId.Compra:
                  this.totalCostBuy += product.pivot.quantity * product.pivot.cost;
                  break;
              }
            }
          );
        });

        if (!this.buys.length) {
          this.notify.alert(messages.report.voidBody, messages.report.voidTitle);
        }

        this.dataSource.setData(buys);
      },
      error => this.notify.serviceError(error)
    );
  }


  downloadCSV() {
    const rows = [];
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

    this.reportService.downloadCSV(rows, `compras-${new Date().toISOString()}`);
  }
}
