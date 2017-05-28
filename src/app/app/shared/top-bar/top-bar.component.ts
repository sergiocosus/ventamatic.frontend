import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import { Router } from "@angular/router";
import { ScheduleService } from "../../../user/schedule/schedule.service";
import {Schedule} from "../../../user/schedule/schedule";
import {AuthService} from "../../../services/auth.service";
import {User} from "../../../user/user";
import {EndScheduleModalComponent} from "../../../user/schedule/end-schedule-modal/end-schedule-modal.component";
import {SubscriptionManager} from "../../../classes/subscription-manager";

@Component({
  selector: 'top-bar',
  templateUrl: 'top-bar.component.html',
  styleUrls: ['top-bar.component.scss'],
})
export class TopBarComponent implements OnInit, OnDestroy {
  @ViewChild(EndScheduleModalComponent) private endScheduleModal:EndScheduleModalComponent;

  public schedule:Schedule;
  public user:User;

  private sub = new SubscriptionManager();

  constructor(private router:Router,
              private scheduleService:ScheduleService,
              private authService:AuthService) {}

  ngOnInit() {
    var subUser = this.authService.getLoggedUser().subscribe(
      user => this.user = user
    );

    var subSchedule = this.scheduleService.getCurrentSchedule().subscribe(
      schedule => this.schedule = schedule
    );

    this.scheduleService.updateCurrentSchedule();

    this.sub.push(subUser);
    this.sub.push(subSchedule);
  }

  ngOnDestroy(){
    this.sub.clear();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  openEndScheduleModal(){
    if(this.schedule){
      this.endScheduleModal.open();
    }
  }

}
