import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { API_CONFIG, ApiConfig } from './types/api-config';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpInterceptorService } from './services/http-interceptor.service';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [
  ]
})
export class ApiModule {
  static forRoot(config: ApiConfig): ModuleWithProviders {
    return {
      ngModule: ApiModule,
      providers: [
        {provide: API_CONFIG, useValue: config},
        {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
      ],
    };
  }
}
