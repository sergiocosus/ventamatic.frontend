import { NgModule } from '@angular/core';
import { ClientDialogComponent } from './components/client-dialog/client-dialog.component';
import { ClientItemComponent } from './components/client-item/client-item.component';
import { SharedModule } from '@app/shared/shared.module';
import { ClientSearchComponent } from './components/client-search/client-search.component';
import { VariousModule } from '../various/various.module';
import { AuthModule } from '../auth/auth.module';
import { MatIconModule, MatMenuModule, MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  imports: [
    SharedModule,
    VariousModule,
    AuthModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
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
}
