import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputLabelComponent } from '../components/input-label/input-label.component';
import { NotifyService } from '../services/notify.service';
import { SelectableComponent } from './selectable/selectable.component';
import { PopoverComponent } from './popover/popover.component';
import {LocalStorageService} from './services/local-storage.service';
import {
  MdButtonModule, MdCheckboxModule, MdDialogModule, MdInputModule, MdRadioModule,
  MdSelectModule
} from '@angular/material';
import {FindProductComponent} from './product/find-product/find-product.component';
import {AutocompleteInputComponent} from '../components/autocomplete-input/autocomplete-input.component';
import {PaymentTypeComponent} from './payment-type/payment-type/payment-type.component';
import {MainContentComponent} from './main-content/main-content.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import {MyCurrencyPipe} from '../pipes/my-currency.pipe';

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
  ],
  declarations: [
    InputLabelComponent,
    SelectableComponent,
    PopoverComponent,
    FindProductComponent,
    AutocompleteInputComponent,
    PaymentTypeComponent,
    MainContentComponent,
    ConfirmDialogComponent,
    MyCurrencyPipe,
  ],
  providers: [
    NotifyService,
    LocalStorageService,
  ],
  entryComponents: [
    ConfirmDialogComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    InputLabelComponent,
    SelectableComponent,
    PopoverComponent,
    MdCheckboxModule,
    MdButtonModule,
    MdInputModule,
    MdSelectModule,
    MdRadioModule,
    MdDialogModule,

    FindProductComponent,
    AutocompleteInputComponent,
    PaymentTypeComponent,
    MainContentComponent,
    ConfirmDialogComponent,
    MyCurrencyPipe,
  ]
})
export class SharedModule { }
