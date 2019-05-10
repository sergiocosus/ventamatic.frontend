import { Component, OnInit, ViewChild } from '@angular/core';
import { IMyDateRangeModel } from 'mydaterangepicker';
import { ReportService } from '@app/api/services/report.service';
import { NotifyService } from '@app/shared/services/notify.service';
import { TicketService } from '@app/api/services/ticket.service';
import { messages } from '@app/shared/classes/messages';
import { ReportDataSource } from '@app/report/classes/report-data-source';
import { MatDialog, MatPaginator } from '@angular/material';
import { SaleService } from '@app/api/services/sale.service';
import { ConfirmDialogComponent, ConfirmDialogData } from '@app/shared/components/confirm-dialog/confirm-dialog.component';
import { filter, mergeMap } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sale-report',
  templateUrl: './sale-report.component.html',
  styleUrls: ['./sale-report.component.scss']
})
export class SaleReportComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  sales = [];

  rangeOptions = {
    editableDateRangeField: true
  };

  totalPriceSale;
  totalPriceSaleDeleted;
  totalProducts = 0;

  dataSource: ReportDataSource | null;
  form: FormGroup;

  constructor(private reportService: ReportService,
              private notify: NotifyService,
              private ticketService: TicketService,
              private saleService: SaleService,
              private dialog: MatDialog,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [],
      branch: [],
      user: [],
      client: [],
      begin_at: [],
      end_at: []
    });
  }

  ngOnInit() {
    this.dataSource = new ReportDataSource(this.paginator);
    this.resetRequest();
  }

  resetRequest() {
    this.form.reset();
  }

  onDateRangeChanged($event: IMyDateRangeModel) {
    this.reportService.formatRange(this.form.getRawValue(), $event);
  }

  resetStats() {
    this.totalPriceSale = 0;
    this.totalPriceSaleDeleted = 0;
    this.totalProducts = 0;
  }

  submit() {
    this.reportService.getSale(this.form.getRawValue()).subscribe(
      sales => {
        this.sales = sales;
        this.resetStats();

        sales.forEach(sale => {
          if (sale.deleted_at) {
            this.totalPriceSaleDeleted += sale.total;
          } else {
            this.totalPriceSale += sale.total;
            sale.products.forEach(
              product => this.totalProducts += product.pivot.quantity
            );
          }
        });

        if (!this.sales.length) {
          this.notify.alert(messages.report.voidBody, messages.report.voidTitle);
        }

        this.dataSource.setData(sales);
      },
      error => this.notify.serviceError(error)
    );
  }

  print(sale) {
    this.ticketService.putSale(sale);
  }

  downloadCSV() {
    const rows = [];
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
          sucursal_id: sale.branch_id,
          sucursal_nombre: sale.branch.name,
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

    this.reportService.downloadCSV(rows, `ventas-${new Date().toISOString()}`);
  }

  deleteSale(sale_id) {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: '¿Desea eliminar la venta?',
      } as ConfirmDialogData
    }).afterClosed().pipe(
      filter(Boolean),
      mergeMap(() => this.saleService.delete(sale_id))
    ).subscribe(
      success => {
        this.notify.success('Venta eliminada');
        this.sales.forEach(sale => {
          if (sale.id === sale_id) {
            sale.deleted_at = '1';
          }
        });
      },
      error => this.notify.serviceError(error)
    );
  }

}
