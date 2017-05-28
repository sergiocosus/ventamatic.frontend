import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  message: string;
  title: string;
  acceptText: string;
  cancelText: string;

  constructor(private dialogRef: MdDialogRef<ConfirmDialogComponent>) { }

  ngOnInit() {
  }

  init(title, message = '', acceptText = 'Aceptar', cancelText = 'Cancelar') {
    this.title = title;
    this.message = message;
    this.acceptText = acceptText;
    this.cancelText = cancelText;
  }

  accept() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
