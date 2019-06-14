import { Component, Inject, OnInit } from '@angular/core';
import { NotifyService } from '@app/shared/services/notify.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { User } from '@app/api/models/user';
import { UserService } from '@app/api/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { extract } from '@app/shared/services/i18n.service';
import { AppValidators } from '@app/shared/validators/app-validators';


@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
})
export class UserDialogComponent implements OnInit {
  loading: boolean;
  form: FormGroup;

  constructor(protected userService: UserService,
              protected notify: NotifyService,
              protected dialogRef: MatDialogRef<UserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public user: User,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      username: [null, [Validators.required]],
      name: [true, []],
      last_name: [[], []],
      last_name_2: [null, []],
      email: [null, []],
      phone: [null, []],
      cellphone: [null, []],
      address: [[], []],
      rfc: [[], []],
      password: [[], []],
      password_confirmation: [[], []],
    }, {
      validator: AppValidators.passwordConfirm
    });

    if (this.user) {
      this.form.reset(this.user);
      this.form.get('username').disable();
    }
  }

  ngOnInit() {
  }

  submit() {
    if (this.form.invalid) {
      this.notify.alert('forms.error');
      return;
    }

    this.loading = true;
    const data = this.form.getRawValue();

    if (this.user) {
      this.userService.put(this.user.id, data)
        .pipe(finalize(() => this.loading = false)).subscribe(
        product => {
          this.notify.success(extract('common.updated'));
          this.dialogRef.close(product);
        },
        error => this.notify.serviceError(error)
      );
    } else {
      this.userService.post(data)
        .pipe(finalize(() => this.loading = false)).subscribe(
        product => {
          this.notify.success(extract('common.created'));
          this.dialogRef.close(product);
        },
        error => this.notify.serviceError(error)
      );
    }
  }
}
