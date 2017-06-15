import {ModuleWithProviders, NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {ReportService} from './report.service';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [],
})
export class ReportModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ReportModule,
      providers: [
        ReportService,
      ],
    };
  }
}
