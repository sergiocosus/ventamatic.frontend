import {ModuleWithProviders, NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {BrandService} from './brand.service';

@NgModule({
  imports: [
    SharedModule,
  ]
})
export class BrandModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: BrandModule,
      providers: [
        BrandService,
      ],
    };
  }
}
