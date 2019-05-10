import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AuthService } from '@app/auth/services/auth.service';
import { ScheduleService } from '@app/api/services/schedule.service';
import { Router } from '@angular/router';
import { SubscriptionManager } from '@app/shared/classes/subscription-manager';
import { User } from '@app/api/models/user';
import { Schedule } from '@app/api/models/schedule';
import { EndScheduleDialogComponent } from '@app/user/components/end-schedule-dialog/end-schedule-dialog.component';
import { AutoUnsubscribe } from '@app/shared/decorators/auto-unsubscribe';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
@AutoUnsubscribe()
export class TopBarComponent implements OnInit {
  public schedule: Schedule;
  public user: User;

  private sub = new SubscriptionManager();

  constructor(private router: Router,
              private scheduleService: ScheduleService,
              private authService: AuthService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.sub.add = this.authService.getLoggedUser().subscribe(
      user => this.user = user
    );

    this.sub.add = this.scheduleService.getCurrentSchedule().subscribe(
      schedule => this.schedule = schedule
    );

    this.scheduleService.updateCurrentSchedule();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  openEndScheduleModal() {
    this.dialog.open(EndScheduleDialogComponent, {data: this.schedule});

  }
}
