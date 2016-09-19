import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpModule, Http } from '@angular/http';
import { AuthHttp, AuthConfig } from "angular2-jwt/angular2-jwt";
import 'rxjs/Rx';
import { ModalComponent,
  ModalHeaderComponent,
  ModalBodyComponent,
  ModalFooterComponent } from "ng2-bs3-modal/ng2-bs3-modal";

import {
  NotificationsService,
  SimpleNotificationsModule
} from 'angular2-notifications/components'
import { apiHttpServiceProvider } from "./shared/api-http";
import {VentamaticFrontendAppComponent} from "./ventamatic-frontend.component";
import {LoginComponent} from "./+login/login.component";
import {UsuariosComponent} from "./+app/+usuarios/usuarios.component";
import {VentaComponent} from "./+app/+venta/venta.component";
import {SelectBranchComponent} from "./+app/+venta/select-branch/select-branch.component";
import {SaleComponent} from "./+app/+venta/sale/sale.component";
import {CompraComponent} from "./+app/+compra/compra.component";
import {InventarioComponent} from "./+app/+inventario/inventario.component";
import {InventorySelectBranch} from "./+app/+inventario/select-branch/select-branch.component";
import {InventoryComponent} from "./+app/+inventario/inventory/inventory.component";
import {ProductosComponent} from "./+app/+productos/productos.component";
import {ClientesComponent} from "./+app/+clientes/clientes.component";
import {ProveedoresComponent} from "./+app/+proveedores/proveedores.component";
import {ReportesComponent} from "./+app/+reportes/reportes.component";
import {RolesComponent} from "./+app/+roles/roles.component";
import {SucursalesComponent} from "./+app/+sucursales/sucursales.component";
import {InputLabelComponent} from "./components/input-label/input-label.component";

import {AsideNavComponent} from "./+app/shared/aside-nav/aside-nav.component";
import {TopBarComponent} from "./+app/shared/top-bar/top-bar.component";
import {routing, appRoutingProviders} from "./ventamatic-frontend.routing";
import {AppComponent} from "./+app/app.component";
import {TicketComponent} from "./+app/+venta/ticket/ticket.component";
import {SearchBarComponent} from "./+app/shared/search-bar/search-bar.component";
import {MainContentComponent} from "./shared/main-content/main-content.component";
import {ClientItemComponent} from "./+app/+clientes/client-item/client-item.component";
import {ClientModalComponent} from "./+app/+clientes/client-modal/client-modal.component";
import {PersonItemComponent} from "./components/person-item/person-item.component";
import {ModalInventarioComponent} from "./+app/+inventario/modal-inventario/modal-inventario.component";
import {ProductModalComponent} from "./+app/+productos/product-modal/product-modal.component";
import {SupplierItemComponent} from "./+app/+proveedores/supplier-item/supplier-item.component";
import {SupplierModalComponent} from "./+app/+proveedores/supplier-modal/supplier-modal.component";
import {BranchModalComponent} from "./+app/+sucursales/branch-modal/branch-modal.component";
import {BranchItemComponent} from "./+app/+sucursales/branch-item/branch-item.component";
import { ButtonsModule } from "ng2-bootstrap";
import {UserModalComponent} from "./+app/+usuarios/user-modal/user-modal.component";
import {UserItemComponent} from "./+app/+usuarios/user-item/user-item.component";
import {AutocompleteInputComponent} from "./components/autocomplete-input/autocomplete-input.component";
import {EndScheduleModalComponent} from "./user/schedule/end-schedule-modal/end-schedule-modal.component";
import {FindProductComponent} from "./shared/product/find-product/find-product.component";
import {SaleConfirmModalComponent} from "./+app/+venta/sale-confirm-modal/sale-confirm-modal.component";
import {BeginBuyModalComponent} from "./shared/buy/begin-buy-modal/begin-buy-modal.component";
import {InventoryCartComponent} from "./shared/product/inventory-cart/inventory-cart.component";
import { ProductCartComponent } from './shared/product/product-cart/product-cart.component';
import { AddProductModalComponent } from './+app/+compra/add-product-modal/add-product-modal.component';
import {BuyService} from "./shared/buy/buy.service";
import { PaymentTypeComponent } from './shared/payment-type/payment-type/payment-type.component';
import {SELECT_DIRECTIVES} from "ng2-select";
import {BrandService} from "./shared/product/brand/brand.service";
import {SupplierCategoryService} from "./+app/+proveedores/category/supplier-category.service";
import { BasicEntityModalComponent } from './components/basic-entity-modal/basic-entity-modal.component';
import {NotifyService} from "./services/notify.service";
import {RoleService} from "./+app/+roles/services/role.service";
import { RoleModalComponent } from './+app/+roles/components/role-modal/role-modal.component';
import {PermissionService} from "./shared/security/permission.service";

const CUSTOM_MODAL_DIRECTIVES = [
  ModalComponent,
  ModalHeaderComponent,
  ModalBodyComponent,
  ModalFooterComponent,
];

let authHttpServiceFactory = (http: Http) => {
  return new AuthHttp(new AuthConfig({
    globalHeaders: [
      { 'Content-Type':'application/json' },
      { 'Accept':'application/json' }
    ],
  }), http);
};


export let authHttpServiceProvider =
{
  provide: AuthHttp,
  useFactory: authHttpServiceFactory,
  deps: [Http]
};

@NgModule({
  declarations: [
    CUSTOM_MODAL_DIRECTIVES,
    SELECT_DIRECTIVES,
    // Main routes directives

    VentamaticFrontendAppComponent,
    AppComponent,
    LoginComponent,
    UsuariosComponent,
    VentaComponent,
    SelectBranchComponent,
    SaleComponent,
    CompraComponent,
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
    InputLabelComponent,
    SearchBarComponent,
    MainContentComponent,
    ClientItemComponent,
    ClientModalComponent,
    PersonItemComponent,
    AsideNavComponent,
    TopBarComponent,
    ProductModalComponent,
    ModalInventarioComponent,
    SupplierItemComponent,
    SupplierModalComponent,
    BranchModalComponent,
    BranchItemComponent,
    UserModalComponent,
    UserItemComponent,
    InventoryCartComponent,
    ProductCartComponent,
    SaleConfirmModalComponent,
    FindProductComponent,
    EndScheduleModalComponent,
    AutocompleteInputComponent,
    BeginBuyModalComponent,
    ProductCartComponent,
    AddProductModalComponent,
    PaymentTypeComponent,
    BasicEntityModalComponent,
    RoleModalComponent,

  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ButtonsModule,
    SimpleNotificationsModule,
    routing
  ],
  providers: [
    appRoutingProviders,
    BuyService,
    BrandService,
    SupplierCategoryService,
    NotifyService,
    RoleService,
    PermissionService,
    authHttpServiceProvider,
    apiHttpServiceProvider,
    NotificationsService,
  ],
  entryComponents: [VentamaticFrontendAppComponent],
  bootstrap: [VentamaticFrontendAppComponent]
})
export class AppModule { }



