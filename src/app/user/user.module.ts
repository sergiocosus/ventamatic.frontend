import { NgModule } from '@angular/core';
import { UserSearchComponent } from './user-search/user-search.component';
import {SharedModule} from '../shared/shared.module';
import {UserService} from './user.service';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    UserSearchComponent,
  ],
  providers: [
    UserService,
  ],
  exports: [
    UserSearchComponent,
  ]
})
export class UserModule { }
