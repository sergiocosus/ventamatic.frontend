import {Component, OnInit, ViewChild} from '@angular/core';
import {IMyDateRangeModel} from 'mydaterangepicker';
import {InventoryMovementTypeService} from '@app/api/services/inventory-movement-type.service';
import {InventoryMovementType} from '@app/api/models/inventory-movement-type.model';
import {ReportService} from '@app/api/services/report.service';
import {NotifyService} from '@app/shared/services/notify.service';
import {messages} from '@app/shared/classes/messages';
import {MatPaginator} from '@angular/material';
import {ReportDataSource} from '@app/report/classes/report-data-source';
import { Form, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-inventory-movement-report',
  templateUrl: './inventory-movement-report.component.html',
  styleUrls: ['./inventory-movement-report.component.scss']
})
export class InventoryMovementReportComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  inventory_movements = [];
  inventoryMovementTypes: InventoryMovementType[];

  rangeOptions = {
    editableDateRangeField: true
  };

  totalUp = 0;
  totalDown = 0;

  statsByType = [];

  totalUpPrice = 0;
  totalDownPrice = 0;

  statsByTypePrice = [];

  dataSource: ReportDataSource | null;
  form: FormGroup;

  constructor(private reportService: ReportService,
              private notify: NotifyService,
              private inventoryMovementTypeService: InventoryMovementTypeService,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      product: null,
      branch: null,
      user: null,
      inventory_movement_type_id: null,
      begin_at: null,
      end_at: null
    });
  }

  ngOnInit() {
    this.dataSource = new ReportDataSource(this.paginator);
    this.form.reset();
    this.loadInventoryMovementTypes();
  }

  loadInventoryMovementTypes() {
    this.inventoryMovementTypeService.getAll().subscribe(
      inventoryMovementTypes => {
        this.inventoryMovementTypes = inventoryMovementTypes;

        this.inventoryMovementTypes.forEach(
          movementType => {
            this.statsByType.push({
              id: movementType.id,
              name: movementType.name,
              totalUp: 0,
              totalDown: 0,
              totalMovements: 0
            });
            this.statsByTypePrice.push({
              id: movementType.id,
              name: movementType.name,
              totalUp: 0,
              totalDown: 0,
              totalMovements: 0
            });
          }
        );

        this.inventoryMovementTypes.unshift(
          {id: null, name: 'Todos'} as InventoryMovementType
        );
      }
    );
  }

  onDateRangeChanged($event: IMyDateRangeModel) {
    this.reportService.formatRange(this.form.getRawValue(), $event);
  }

  resetStats() {
    this.totalUp = 0;
    this.totalDown = 0;
    this.statsByType.forEach(
      stat => {
        stat.totalMovements = 0;
        stat.totalUp = 0;
        stat.totalDown = 0;
      }
    );

    this.totalUpPrice = 0;
    this.totalDownPrice = 0;
    this.statsByTypePrice.forEach(
      stat => {
        stat.totalMovements = 0;
        stat.totalUp = 0;
        stat.totalDown = 0;
      }
    );
  }

  submit() {
    this.reportService.getInventoryMovements(this.form.getRawValue()).subscribe(
      inventoryMovements => {
        this.inventory_movements = inventoryMovements;
        this.resetStats();

        inventoryMovements.forEach(inventoryMovement => {
          if (inventoryMovement.quantity > 0) {
            this.totalUp += inventoryMovement.quantity;
            this.totalUpPrice += inventoryMovement.quantity * inventoryMovement.value;
          } else {
            this.totalDown -= inventoryMovement.quantity;
            this.totalDownPrice -= inventoryMovement.quantity * inventoryMovement.value;
          }

          this.statsByType.forEach(
            stats => {
              if (inventoryMovement.inventory_movement_type_id === stats.id) {
                stats.totalMovements++;

                if (inventoryMovement.quantity > 0) {
                  stats.totalUp += inventoryMovement.quantity;
                } else {
                  stats.totalDown -= inventoryMovement.quantity;
                }
              }
            }
          );

          this.statsByTypePrice.forEach(
            stats => {
              if (inventoryMovement.inventory_movement_type_id === stats.id) {
                stats.totalMovements++;

                if (inventoryMovement.quantity > 0) {
                  stats.totalUp += inventoryMovement.quantity * inventoryMovement.value;
                } else {
                  stats.totalDown -= inventoryMovement.quantity * inventoryMovement.value;
                }
              }
            }
          );
        });

        if (!this.inventory_movements.length) {
          this.notify.alert(messages.report.voidBody, messages.report.voidTitle);
        }

        this.dataSource.setData(inventoryMovements);
      },
      error => this.notify.serviceError(error)
    );
  }


  downloadCSV() {
    this.reportService.downloadCSV(this.inventory_movements.map(
      inventoryMovement => ({
        fecha_hora: this.reportService.formatDateTime(inventoryMovement.created_at),
        fecha: this.reportService.formatDate(inventoryMovement.created_at),
        hora: this.reportService.formatTime(inventoryMovement.created_at),
        id: inventoryMovement.id,
        sucursal_id: inventoryMovement.branch_id,
        sucursal_nombre: inventoryMovement.branch.name,
        usuario_id: inventoryMovement.user_id,
        usuario_nombre: inventoryMovement.user.name,
        usuario_apellido_paterno: inventoryMovement.user.last_name,
        usuario_apellido_materno: inventoryMovement.user.last_name_2,
        producto_id: inventoryMovement.product_id,
        producto_nombre: inventoryMovement.product.description,
        cantidad: inventoryMovement.quantity,
        tipo_movimiento_inventario_id: inventoryMovement.inventory_movement_type.name,
        lote: inventoryMovement.batch,
      })
    ), `entradas-salidas-${new Date().toISOString()}`);
  }

}
