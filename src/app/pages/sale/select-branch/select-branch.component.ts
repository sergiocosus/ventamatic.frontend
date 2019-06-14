import { Component, OnInit } from '@angular/core';
import { User } from '@app/api/models/user';
import { Router } from '@angular/router';
import { ScheduleService } from '@app/api/services/schedule.service';
import { NotifyService } from '@app/shared/services/notify.service';
import { Branch } from '@app/api/models/branch';
import { AuthService } from '@app/auth/services/auth.service';
import { AutoUnsubscribe } from '@app/shared/decorators/auto-unsubscribe';
import { SubscriptionManager } from '@app/shared/classes/subscription-manager';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-select-branch',
  templateUrl: './select-branch.component.html',
  styleUrls: ['./select-branch.component.scss'],
})
@AutoUnsubscribe()
export class SelectBranchComponent implements OnInit {
  branches: Branch[];
  private user: User;

  sub = new SubscriptionManager();

  form: FormGroup;
  loading: boolean;

  constructor(private router: Router,
              private scheduleService: ScheduleService,
              private notify: NotifyService,
              private authService: AuthService,
              private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      branch: [null, [Validators.required]],
      initial_amount: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    this.sub.add = this.scheduleService.getCurrentSchedule().subscribe(
      schedule => {
        if (schedule) {
          this.router.navigateByUrl('/venta/' + schedule.branch_id);
        } else {
          this.loadBranches();
        }
      }
    );
  }

  loadBranches() {
    this.sub.add = this.authService.getLoggedUser().subscribe(user => {
      this.user = user;
      this.branches = user.getBranchesWithPermission('sale');
    });
  }

  submit() {
    if (this.form.invalid) {
      this.notify.alert('forms.error');
      return;
    }

    const data = this.form.getRawValue();

    this.loading = true;
    this.scheduleService.post(data.branch.id, data.initial_amount)
      .pipe(finalize(() => this.loading = false))
      .subscribe(
      schedule => this.scheduleService.updateCurrentSchedule(schedule),
      error => this.notify.serviceError(error)
    );
  }
}
