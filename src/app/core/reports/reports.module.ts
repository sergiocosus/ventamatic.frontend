import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import {ReportesComponent} from './reportes.component';
import {BuyReportComponent} from './buy-report/buy-report.component';
import {HistoricInventoryReportComponent} from './historic-inventory-report/historic-inventory-report.component';
import {MenuReportComponent} from './menu-report/menu-report.component';
import {InventoryMovementReportComponent} from './inventory-movement-report/inventory-movement-report.component';
import {InventoryReportComponent} from './inventory-report/inventory-report.component';
import {SaleReportComponent} from './sale-report/sale-report.component';
import {ScheduleReportComponent} from './schedule-report/schedule-report.component';
import {SharedModule} from '../../shared/shared.module';
import {AuthModule} from '../../modules/auth/auth.module';
import {BranchModule} from '../../modules/branch/branch.module';
import {UserModule} from '../../modules/user/user.module';
import {SupplierModule} from '../../modules/supplier/supplier.module';
import {ProductModule} from '../../modules/product/product.module';
import {ClientModule} from '../../modules/client/client.module';
import {MatPaginatorModule, MatTableModule} from '@angular/material';

@NgModule({
  imports: [
    ReportsRoutingModule,
    SharedModule,
    AuthModule,
    BranchModule,
    UserModule,
    SupplierModule,
    ProductModule,
    ClientModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  declarations: [
    ReportesComponent,
    MenuReportComponent,
    BuyReportComponent,
    HistoricInventoryReportComponent,
    InventoryMovementReportComponent,
    InventoryReportComponent,
    SaleReportComponent,
    ScheduleReportComponent,
  ]
})
export class ReportsModule { }
