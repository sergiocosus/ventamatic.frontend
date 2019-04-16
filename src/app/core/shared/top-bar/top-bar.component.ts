import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {MatDialog} from '@angular/material';
import {AuthService} from '../../../auth/services/auth.service';
import {ScheduleService} from '../../../user/services/schedule.service';
import {Router} from '@angular/router';
import {SubscriptionManager} from '../../../shared/classes/subscription-manager';
import {User} from '../../../user/classes/user';
import {Schedule} from '../../../user/classes/schedule';
import {EndScheduleDialogComponent} from '../../../user/componets/end-schedule-dialog/end-schedule-dialog.component';
import {Sidebar} from 'ng-sidebar';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit, OnDestroy {
  @Input() sideBar: Sidebar;
  public schedule: Schedule;
  public user: User;

  private sub = new SubscriptionManager();

  constructor(private router: Router,
              private scheduleService: ScheduleService,
              private authService: AuthService,
              private dialog: MatDialog) {}

  ngOnInit() {
    const subUser = this.authService.getLoggedUser().subscribe(
      user => this.user = user
    );

    const subSchedule = this.scheduleService.getCurrentSchedule().subscribe(
      schedule => this.schedule = schedule
    );

    this.scheduleService.updateCurrentSchedule();

    this.sub.push(subUser);
    this.sub.push(subSchedule);
  }

  ngOnDestroy() {
    this.sub.clear();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  openEndScheduleModal() {
    if (this.schedule) {
      this.dialog.open(EndScheduleDialogComponent)
        .componentInstance.init(this.schedule);
    }
  }

  toggleSideBar() {
    if (this.sideBar.opened) {
      this.sideBar.close();
    } else {
      this.sideBar.open();
    }
  }

}
