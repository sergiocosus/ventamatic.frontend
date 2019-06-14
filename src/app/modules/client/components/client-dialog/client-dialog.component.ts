import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Client } from '@app/api/models/client';
import { ClientService } from '@app/api/services/client.service';
import { NotifyService } from '@app/shared/services/notify.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { extract } from '@app/shared/services/i18n.service';

@Component({
  selector: 'app-client-modal',
  templateUrl: './client-dialog.component.html',
  styleUrls: ['./client-dialog.component.scss'],
})
export class ClientDialogComponent {
  form: FormGroup;
  loading = false;

  constructor(protected clientService: ClientService,
              protected notify: NotifyService,
              protected dialogRef: MatDialogRef<ClientDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public client: Client,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      last_name: [null, []],
      last_name_2: [null, []],
      email: [null, []],
      phone: [null, []],
      cellphone: [null, []],
      address: [null, []],
      rfc: [null, []],
    });

    if (this.client) {
      this.form.reset(this.client);
    }
  }
  submit() {
    if (this.form.invalid) {
      this.notify.alert(extract('forms.error'));
      return;
    }

    this.loading = true;
    if (this.client) {
      this.clientService.put(this.client.id, this.form.getRawValue())
        .pipe(finalize(() => this.loading = false)).subscribe(
        client => {
          this.notify.success(extract('common.updatedSuccess'));
          this.dialogRef.close(client);
        },
        error => this.notify.serviceError(error)
      );
    } else {
      this.clientService.post(this.form.getRawValue())
        .pipe(finalize(() => this.loading = false)).subscribe(
        client => {
          this.notify.success(extract('common.createdSuccess'));
          this.dialogRef.close(client);
        },
        error => this.notify.serviceError(error)
      );
    }
  }
}
