import { Component, OnInit } from '@angular/core';
import {ReportService} from "../../../shared/report/report.service";
import {NotifyService} from "../../../services/notify.service";
import {messages} from "../../../shared/messages";

@Component({
  selector: 'app-inventory-movement-report',
  templateUrl: './inventory-movement-report.component.html',
  styleUrls: ['./inventory-movement-report.component.scss']
})
export class InventoryMovementReportComponent implements OnInit {
  private inventory_movements = [];

  request:{
    product_id:number,
    branch_id:number,
    user_id:number,
    inventory_movement_type_id:number,
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
      product_id:null,
      branch_id:null,
      user_id:null,
      inventory_movement_type_id:null,
      begin_at:null,
      end_at:null
    };
  }

  submit(){
    this.reportService.getInventoryMovements(this.request).subscribe(
      inventory_movements => {
        this.inventory_movements = inventory_movements;
        if (!this.inventory_movements.length) {
          this.notify.alert(messages.report.voidBody, messages.report.voidTitle)
        }
      },
      error => this.notify.serviceError(error)
    )
  }


  downloadCSV(){
    this.reportService.downloadCSV(this.inventory_movements.map(
      inventoryMovement => ({
        id: inventoryMovement.id,
        usuario_id: inventoryMovement.user_id,
        sucursal_id: inventoryMovement.branch_id,
        producto_id: inventoryMovement.product_id,
        tipo_de_movimiento_de_inventario_id: inventoryMovement.inventory_movement_type_id,
        lote: inventoryMovement.batch,
        cantidad: inventoryMovement.quantity,
        creado: this.reportService.formatDate(inventoryMovement.created_at),
        actualizado: this.reportService.formatDate(inventoryMovement.updated_at),
        borrado: this.reportService.formatDate(inventoryMovement.deleted_at)
      })
    ), `entradas-salidas-${new Date().toISOString()}`);
  }

}
