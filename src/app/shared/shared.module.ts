import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputLabelComponent } from '../components/input-label/input-label.component';
import { NotifyService } from '../services/notify.service';
import { SelectableComponent } from './selectable/selectable.component';
import { PopoverComponent } from './popover/popover.component';
import {LocalStorageService} from './services/local-storage.service';
import {MdButtonModule, MdCheckboxModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdCheckboxModule,
    MdButtonModule,
  ],
  declarations: [
    InputLabelComponent,
    SelectableComponent,
    PopoverComponent,
  ],
  providers: [
    NotifyService,
    LocalStorageService,
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
  ]
})
export class SharedModule { }
