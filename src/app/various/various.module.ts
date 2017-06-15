import { NgModule } from '@angular/core';
import {PersonItemComponent} from './components/person-item/person-item.component';
import {SharedModule} from '../shared/shared.module';
import {AuthModule} from '../auth/auth.module';
import {BasicEntityDialogComponent} from './components/basic-entity-dialog/basic-entity-dialog.component';

@NgModule({
  imports: [
    SharedModule,
    AuthModule,
  ],
  declarations: [
    PersonItemComponent,
    BasicEntityDialogComponent,
  ],
  entryComponents: [
    BasicEntityDialogComponent,
  ],
  exports: [
    PersonItemComponent,
    BasicEntityDialogComponent,
  ]
})
export class VariousModule { }
