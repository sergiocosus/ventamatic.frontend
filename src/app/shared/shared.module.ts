import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import 'rxjs/Rx';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatAutocompleteModule,
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule, MatIconModule,
  MatInputModule,
  MatPaginatorModule, MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSortModule,
  MatTooltipModule
} from '@angular/material';
import { SelectableComponent } from './components/selectable/selectable.component';
import { PaymentTypeComponent } from './components/payment-type/payment-type.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MyCurrencyPipe } from './pipes/my-currency.pipe';
import { NotifyService } from './services/notify.service';
import { PopoverComponent } from './components/popover/popover.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ResponsiveModule } from 'ng2-responsive';
import { LogoComponent } from './components/logo/logo.component';
import { LoadingButtonComponent } from '@app/shared/components/loading-button/loading-button.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDialogModule,
    MyDateRangePickerModule,
    MatTooltipModule,
    SimpleNotificationsModule,
    ResponsiveModule,
    MatPaginatorModule,
    MatSortModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  declarations: [
    SelectableComponent,
    PopoverComponent,
    PaymentTypeComponent,
    MainContentComponent,
    ConfirmDialogComponent,
    MyCurrencyPipe,
    SearchBarComponent,
    LogoComponent,
    LoadingButtonComponent,
  ],
  providers: [
    NotifyService,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline'
      }
    }
  ],
  entryComponents: [
    ConfirmDialogComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    SelectableComponent,
    PopoverComponent,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDialogModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatAutocompleteModule,
    MyDateRangePickerModule,
    MatIconModule,
    TranslateModule,

    PaymentTypeComponent,
    MainContentComponent,
    ConfirmDialogComponent,
    MyCurrencyPipe,
    SearchBarComponent,
    ResponsiveModule,
    LogoComponent,
    LoadingButtonComponent,
  ]
})
export class SharedModule {
}
