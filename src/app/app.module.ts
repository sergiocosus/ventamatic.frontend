import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { enableProdMode, provide } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { AuthHttp, AuthConfig } from "angular2-jwt/angular2-jwt";
import 'rxjs/Rx';
import { ModalComponent,
  ModalHeaderComponent,
  ModalBodyComponent,
  ModalFooterComponent } from "ng2-bs3-modal/ng2-bs3-modal";

import { NotificationsService } from 'angular2-notifications/components'
import {API_HTTP_PROVIDERS} from "./shared/api-http";
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

const CUSTOM_MODAL_DIRECTIVES = [
  ModalComponent,
  ModalHeaderComponent,
  ModalBodyComponent,
  ModalFooterComponent,
];

@NgModule({
  declarations: [
    CUSTOM_MODAL_DIRECTIVES,
    InputLabelComponent,
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


    AsideNavComponent,
    TopBarComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  providers: [
    appRoutingProviders,
    provide(AuthHttp, {
      useFactory: (http) => {
        return new AuthHttp(new AuthConfig({
          globalHeaders: [
            { 'Content-Type':'application/json' },
            { 'Accept':'application/json' }
          ],
        }), http);
      },
      deps: [Http]
    }),
    API_HTTP_PROVIDERS,
    NotificationsService,
  ],
  entryComponents: [VentamaticFrontendAppComponent],
  bootstrap: [VentamaticFrontendAppComponent]
})
export class AppModule {

}
