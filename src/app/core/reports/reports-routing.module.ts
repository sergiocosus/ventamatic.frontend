import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReportesComponent} from './reportes.component';
import {MenuReportComponent} from './menu-report/menu-report.component';
import {ScheduleReportComponent} from './schedule-report/schedule-report.component';
import {SaleReportComponent} from './sale-report/sale-report.component';
import {BuyReportComponent} from './buy-report/buy-report.component';
import {InventoryMovementReportComponent} from './inventory-movement-report/inventory-movement-report.component';
import {InventoryReportComponent} from './inventory-report/inventory-report.component';
import {HistoricInventoryReportComponent} from './historic-inventory-report/historic-inventory-report.component';

const routes: Routes = [
  {
    path: '',
    component: ReportesComponent,
    children: [
      {
        path: '',
        component: MenuReportComponent
      },
      {
        path: 'turno',
        component: ScheduleReportComponent
      },
      {
        path: 'venta',
        component: SaleReportComponent
      },
      {
        path: 'compra',
        component: BuyReportComponent
      },
      {
        path: 'entradas-salidas',
        component: InventoryMovementReportComponent
      },
      {
        path: 'inventario',
        component: InventoryReportComponent
      },
      {
        path: 'inventario-historico',
        component: HistoricInventoryReportComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
