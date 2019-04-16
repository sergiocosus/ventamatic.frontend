import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {MatDialogRef} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NotifyService} from '../../../shared/services/notify.service';

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.scss']
})
export class PasswordDialogComponent implements OnInit {
  form: FormGroup;

  constructor(private userService: UserService,
              private dialogRef: MatDialogRef<PasswordDialogComponent>,
              private fb: FormBuilder,
              private notify: NotifyService) {
    this.form = fb.group({
      current_password: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', [Validators.required, this.validatePasswordConfirmation.bind(this)]]
    });
  }

  ngOnInit() {
  }

  validatePasswordConfirmation(control: FormControl): any {
    if (this.form) {
      return control.value === this.form.get('password').value ? null : { notSame: true};
    }
  }

  submit() {
    this.userService.putPassword(
        this.form.get('current_password').value,
        this.form.get('password').value).subscribe(
      success => {
        this.notify.success('Contraseña cambiada con éxito');
        this.dialogRef.close();
      },
      error => this.notify.serviceError(error)
    );
  }
}
