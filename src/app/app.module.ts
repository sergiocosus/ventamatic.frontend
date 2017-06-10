import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule, DecimalPipe} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpModule, Http } from '@angular/http';
import 'rxjs/Rx';

import {
  NotificationsService,
  SimpleNotificationsModule
} from 'angular2-notifications';
import { apiHttpServiceProvider } from './shared/api-http';
import {VentamaticFrontendAppComponent} from './ventamatic-frontend.component';
import {LoginComponent} from './login/login.component';
import {UsuariosComponent} from './app/+usuarios/usuarios.component';
import {VentaComponent} from './app/sale/venta.component';
import {SelectBranchComponent} from './app/sale/select-branch/select-branch.component';
import {SaleComponent} from './app/sale/sale/sale.component';
import {InventarioComponent} from './app/+inventario/inventario.component';
import {InventorySelectBranch} from './app/+inventario/select-branch/select-branch.component';
import {InventoryComponent} from './app/+inventario/inventory/inventory.component';
import {ProductosComponent} from './app/+productos/productos.component';
import {ClientesComponent} from './app/+clientes/clientes.component';
import {ProveedoresComponent} from './app/+proveedores/proveedores.component';
import {ReportesComponent} from './app/+reportes/reportes.component';
import {RolesComponent} from './app/+roles/roles.component';
import {SucursalesComponent} from './app/+sucursales/sucursales.component';

import {AsideNavComponent} from './app/shared/aside-nav/aside-nav.component';
import {TopBarComponent} from './app/shared/top-bar/top-bar.component';
import {routing, appRoutingProviders} from './ventamatic-frontend.routing';
import {AppComponent} from './app/app.component';
import {TicketComponent} from './app/sale/ticket/ticket.component';
import {SearchBarComponent} from './app/shared/search-bar/search-bar.component';
import {ClientItemComponent} from './app/+clientes/client-item/client-item.component';
import {ClientModalComponent} from './app/+clientes/client-modal/client-modal.component';
import {PersonItemComponent} from './components/person-item/person-item.component';
import {ProductModalComponent} from './app/+productos/product-modal/product-modal.component';
import {SupplierItemComponent} from './app/+proveedores/supplier-item/supplier-item.component';
import {SupplierModalComponent} from './app/+proveedores/supplier-modal/supplier-modal.component';
import {BranchModalComponent} from './app/+sucursales/branch-modal/branch-modal.component';
import {BranchItemComponent} from './app/+sucursales/branch-item/branch-item.component';
import { ButtonsModule } from 'ng2-bootstrap';
import {UserModalComponent} from './app/+usuarios/user-modal/user-modal.component';
import {UserItemComponent} from './app/+usuarios/user-item/user-item.component';
import {EndScheduleModalComponent} from './user/schedule/end-schedule-modal/end-schedule-modal.component';
import {InventoryCartComponent} from './shared/product/inventory-cart/inventory-cart.component';
import {BrandService} from './shared/product/brand/brand.service';
import {SupplierCategoryService} from './app/+proveedores/category/supplier-category.service';
import { BasicEntityModalComponent } from './components/basic-entity-modal/basic-entity-modal.component';
import {RoleService} from './app/+roles/services/role.service';
import { RoleModalComponent } from './app/+roles/components/role-modal/role-modal.component';
import {PermissionService} from './shared/security/permission.service';
import {SelectModule} from 'ng2-select';
import {BranchService} from './app/+sucursales/shared/branch.service';
import {BranchPermissionService} from './shared/security/branch-permission.service';
import {BranchRoleService} from './app/+roles/services/branch-role.service';
import { BranchRoleModalComponent } from './app/+roles/components/branch-role-modal/branch-role-modal.component';
import { UserRoleModalComponent } from './app/+usuarios/user-role-modal/user-role-modal.component';
import {AuthGuardService} from './services/auth-guard.service';
import {AuthService} from './services/auth.service';
import {NoAuthGuardService} from './services/no-auth-guard.service';
import {TicketService} from './app/sale/ticket/ticket.service';
import {ProductService} from './shared/product/product.service';
import {ClientService} from './app/+clientes/shared/client.service';
import {CategoryService} from './shared/product/category/category.service';
import {ScheduleService} from './user/schedule/schedule.service';
import { UserCanDirective } from './directives/user-can.directive';
import { MainComponent } from './app/main/main.component';
import { UserCanInBranchDirective } from './directives/user-can-in-branch.directive';
import {ReportService} from './shared/report/report.service';
import { SaleReportComponent } from './app/+reportes/sale-report/sale-report.component';
import { MenuReportComponent } from './app/+reportes/menu-report/menu-report.component';
import {BuyReportComponent} from './app/+reportes/buy-report/buy-report.component';
import { InventoryMovementReportComponent } from './app/+reportes/inventory-movement-report/inventory-movement-report.component';
import { InventoryReportComponent } from './app/+reportes/inventory-report/inventory-report.component';
import { HistoricInventoryReportComponent } from './app/+reportes/historic-inventory-report/historic-inventory-report.component';
import { ScheduleReportComponent } from './app/+reportes/schedule-report/schedule-report.component';
import { CsvService } from 'angular2-json2csv';
import { MyAccountComponent } from './app/+my-account/my-account.component';
import {PopoverModule} from 'ng2-popover';
import {ProductModule} from './product/product.module';
import {ClientModule} from './client/client.module';
import {SharedModule} from './shared/shared.module';
import {SupplierModule} from './supplier/supplier.module';
import {UserModule} from './user/user.module';
import {BranchModule} from './branch/branch.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MyDateRangePickerModule} from 'mydaterangepicker';
import {InventoryModule} from './inventory/inventory.module';
import {Ng2Bs3ModalModule} from 'ng2-bs3-modal/ng2-bs3-modal';
import { ProductCartRowComponent } from './app/sale/product-cart-row/product-cart-row.component';

@NgModule({
  declarations: [
    VentamaticFrontendAppComponent,
    AppComponent,
    LoginComponent,
    UsuariosComponent,
    VentaComponent,
    SelectBranchComponent,
    SaleComponent,
    InventarioComponent,
    InventorySelectBranch,
    InventoryComponent,
    ProductosComponent,
    ClientesComponent,
    ProveedoresComponent,
    ReportesComponent,
    RolesComponent,
    SucursalesComponent,

    TicketComponent,
    SearchBarComponent,
    ClientItemComponent,
    ClientModalComponent,
    PersonItemComponent,
    AsideNavComponent,
    TopBarComponent,
    ProductModalComponent,
    SupplierItemComponent,
    SupplierModalComponent,
    BranchModalComponent,
    BranchItemComponent,
    UserModalComponent,
    UserItemComponent,
    InventoryCartComponent,
    EndScheduleModalComponent,
    BasicEntityModalComponent,
    RoleModalComponent,
    BranchRoleModalComponent,
    UserRoleModalComponent,
    UserCanDirective,
    MainComponent,
    UserCanInBranchDirective,
    SaleReportComponent,
    BuyReportComponent,
    MenuReportComponent,
    InventoryMovementReportComponent,
    InventoryReportComponent,
    HistoricInventoryReportComponent,
    ScheduleReportComponent,
    MyAccountComponent,
    ProductCartRowComponent,
  ],
  imports: [
    SharedModule,
    routing,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ButtonsModule,
    SimpleNotificationsModule,
    SelectModule,
    Ng2Bs3ModalModule,
    PopoverModule,
    MyDateRangePickerModule,
    ProductModule,
    ClientModule,
    SupplierModule,
    UserModule,
    BranchModule,
    InventoryModule,
  ],
  providers: [
    appRoutingProviders,
    CsvService,
    DecimalPipe,
    BrandService,
    SupplierCategoryService,
    RoleService,
    PermissionService,
    apiHttpServiceProvider,
    NotificationsService,
    BranchPermissionService,
    BranchRoleService,
    AuthGuardService,
    NoAuthGuardService,
    AuthService,
    TicketService,
    ProductService,
    ClientService,
    CategoryService,
    ScheduleService,
    BranchService,
    ReportService,
  ],
  entryComponents: [VentamaticFrontendAppComponent],
  bootstrap: [VentamaticFrontendAppComponent]
})
export class AppModule { }



