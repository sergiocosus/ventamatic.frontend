import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { CacheManagerService } from '@app/api/services/cache-manager.service';
import { environment } from '../environments/environment';
import { ApiModule } from '@app/api/api.module';
import { HttpClientModule } from '@angular/common/http';
import { appRoutingProviders, routing } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, DecimalPipe } from '@angular/common';
import { SimpleNotificationsModule } from 'angular2-notifications/dist';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { SaleModule } from '@app/sale/sale.module';

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
    HttpClientModule,
    ApiModule.forRoot({
      apiUrl: environment.api.url,
      apiClientID: environment.api.clientID,
      apiClientSecret: environment.api.clientSecret,
    }),
    SimpleNotificationsModule.forRoot(),
    SaleModule,
  ],
  providers: [
    appRoutingProviders,
    DecimalPipe,
    CacheManagerService,
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
