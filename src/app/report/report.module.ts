import {ModuleWithProviders, NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {ReportService} from './report.service';
import {MatTableModule} from '@angular/material';

@NgModule({
  imports: [
    SharedModule,
    MatTableModule
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
