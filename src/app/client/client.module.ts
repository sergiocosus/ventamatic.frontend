import {ModuleWithProviders, NgModule} from '@angular/core';
import {ClientDialogComponent} from './components/client-dialog/client-dialog.component';
import {ClientItemComponent} from './components/client-item/client-item.component';
import {SharedModule} from '../shared/shared.module';
import {ClientSearchComponent} from './components/client-search/client-search.component';
import {ClientService} from './services/client.service';
import {VariousModule} from '../various/various.module';
import {AuthModule} from '../auth/auth.module';

@NgModule({
  imports: [
    SharedModule,
    VariousModule,
    AuthModule,
  ],
  declarations: [
    ClientSearchComponent,
    ClientDialogComponent,
    ClientItemComponent,
  ],
  entryComponents: [
    ClientDialogComponent,
  ],
  exports: [
    ClientSearchComponent,
    ClientDialogComponent,
    ClientItemComponent,
  ]
})
export class ClientModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ClientModule,
      providers: [
        ClientService,
      ],
    };
  }
}
