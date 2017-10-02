import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import 'rxjs/Rx';
import {LocalStorageService} from './services/local-storage.service';
import {
  MdButtonModule, MdCheckboxModule, MdDialogModule, MdInputModule, MdPaginatorModule, MdRadioModule,
  MdSelectModule, MdTooltipModule
} from '@angular/material';
import {SelectableComponent} from './components/selectable/selectable.component';
import {AutocompleteInputComponent} from './components/autocomplete-input/autocomplete-input.component';
import {PaymentTypeComponent} from './components/payment-type/payment-type.component';
import {MainContentComponent} from './components/main-content/main-content.component';
import {ConfirmDialogComponent} from './components/confirm-dialog/confirm-dialog.component';
import {MyCurrencyPipe} from './pipes/my-currency.pipe';
import {NotifyService} from './services/notify.service';
import {PopoverComponent} from './components/popover/popover.component';
import {apiHttpServiceProvider} from './services/api-http';
import {SearchBarComponent} from './components/search-bar/search-bar.component';
import {MyDateRangePickerModule} from 'mydaterangepicker';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {ResponsiveModule} from 'ng2-responsive';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdCheckboxModule,
    MdButtonModule,
    MdInputModule,
    MdSelectModule,
    MdRadioModule,
    MdDialogModule,
    MyDateRangePickerModule,
    MdTooltipModule,
    SimpleNotificationsModule,
    ResponsiveModule,
    MdPaginatorModule,
  ],
  declarations: [
    SelectableComponent,
    PopoverComponent,
    AutocompleteInputComponent,
    PaymentTypeComponent,
    MainContentComponent,
    ConfirmDialogComponent,
    MyCurrencyPipe,
    SearchBarComponent,
  ],
  providers: [
    NotifyService,
    LocalStorageService,
    apiHttpServiceProvider,
  ],
  entryComponents: [
    ConfirmDialogComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    SelectableComponent,
    PopoverComponent,
    MdCheckboxModule,
    MdButtonModule,
    MdInputModule,
    MdSelectModule,
    MdRadioModule,
    MdDialogModule,
    MdTooltipModule,
    MdPaginatorModule,
    MyDateRangePickerModule,

    AutocompleteInputComponent,
    PaymentTypeComponent,
    MainContentComponent,
    ConfirmDialogComponent,
    MyCurrencyPipe,
    SearchBarComponent,
    ResponsiveModule,
  ]
})
export class SharedModule { }
