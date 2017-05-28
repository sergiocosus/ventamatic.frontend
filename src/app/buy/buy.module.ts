import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {BeginBuyModalComponent} from './components/begin-buy-modal/begin-buy-modal.component';
import {BuyService} from './services/buy.service';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    BeginBuyModalComponent,
  ],
  providers: [
    BuyService,
  ],
  exports: [
    BeginBuyModalComponent,
  ]
})
export class BuyModule { }
