import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '@app/api/models/user';
import { Router } from '@angular/router';
import { ScheduleService } from '@app/api/services/schedule.service';
import { NotifyService } from '@app/shared/services/notify.service';
import { Branch } from '@app/api/models/branch';
import { AuthService } from '@app/auth/services/auth.service';
import { AutoUnsubscribe } from '@app/shared/decorators/auto-unsubscribe';
import { SubscriptionManager } from '@app/shared/classes/subscription-manager';


@Component({
  selector: 'app-select-branch',
  templateUrl: './select-branch.component.html',
  styleUrls: ['./select-branch.component.scss'],
})
@AutoUnsubscribe()
export class SelectBranchComponent implements OnInit {
  private scheduleSubscription: Subscription;

  branches: Branch[] = [];
  initial_amount: number;
  selectedBranch: Branch;
  private user: User;

  sub = new SubscriptionManager();

  constructor(private router: Router,
              private scheduleService: ScheduleService,
              private notify: NotifyService,
              private authService: AuthService
  ) {
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
    this.sub.add = this.authService.getLoggedUser().subscribe(
      user => {
        this.user = user;
        this.branches = user.getBranchesWithPermission('sale');
      }
    );
  }

  submit() {
    this.scheduleService.post(this.selectedBranch.id, this.initial_amount).subscribe(
      schedule => {
        this.scheduleService.updateCurrentSchedule(schedule);
      },
      error => this.notify.serviceError(error)
    );
  }
}
