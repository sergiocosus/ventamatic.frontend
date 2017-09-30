import {ModuleWithProviders, NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {ReportService} from './report.service';
import {MdTableModule} from '@angular/material';

@NgModule({
  imports: [
    SharedModule,
    MdTableModule
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
