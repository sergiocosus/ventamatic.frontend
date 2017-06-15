import {ModuleWithProviders, NgModule} from '@angular/core';
import {CategoryService} from './category.service';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ]
})
export class CategoryModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CategoryModule,
      providers: [
        CategoryService,
      ],
    };
  }
}
