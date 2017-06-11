import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule, DecimalPipe} from '@angular/common';
import { HttpModule } from '@angular/http';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {routing, appRoutingProviders} from './app.routing';
import { ButtonsModule } from 'ng2-bootstrap';
import { CsvService } from 'angular2-json2csv';
import {PopoverModule} from 'ng2-popover';
import {SharedModule} from './shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthModule} from './auth/auth.module';
import {AppComponent} from './app.component';
import {SaleModule} from './sale/sale.module';
import {UserModule} from './user/user.module';
import {BranchModule} from './branch/branch.module';
import {BrandModule} from './brand/brand.module';
import {BuyModule} from './buy/buy.module';
import {CategoryModule} from './category/category.module';
import {ClientModule} from './client/client.module';
import {InventoryModule} from './inventory/inventory.module';
import {ProductModule} from './product/product.module';
import {ReportModule} from './report/report.module';
import {RolModule} from './rol/rol.module';
import {SupplierModule} from './supplier/supplier.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    SharedModule,
    routing,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpModule,
    ButtonsModule,
    PopoverModule,
    SimpleNotificationsModule.forRoot(),
    AuthModule.forRoot(),
    UserModule.forRoot(),
    BranchModule.forRoot(),
    BrandModule.forRoot(),
    BuyModule.forRoot(),
    CategoryModule.forRoot(),
    ClientModule.forRoot(),
    InventoryModule.forRoot(),
    ProductModule.forRoot(),
    ReportModule.forRoot(),
    RolModule.forRoot(),
    SaleModule.forRoot(),
    SupplierModule.forRoot(),
    UserModule.forRoot(),
  ],
  providers: [
    appRoutingProviders,
    CsvService,
    DecimalPipe,
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }



