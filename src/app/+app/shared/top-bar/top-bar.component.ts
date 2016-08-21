import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from "@angular/router";
import { ScheduleService } from "../../../user/schedule/schedule.service";
import {Schedule} from "../../../user/schedule/schedule";
import {AuthService} from "../../../services/auth.service";
import {User} from "../../../user/user";
import {EndScheduleModalComponent} from "../../../user/schedule/end-schedule-modal/end-schedule-modal.component";
@Component({
  selector: 'top-bar',
  templateUrl: 'top-bar.component.html',
  styleUrls: ['top-bar.component.scss'],
  directives: [
    EndScheduleModalComponent
  ]
})
export class TopBarComponent implements OnInit {
  @ViewChild(EndScheduleModalComponent) private endScheduleModal:EndScheduleModalComponent;

  public schedule:Schedule;
  public user:User;

  constructor(private router:Router,
              private scheduleService:ScheduleService,
              private authService:AuthService) {}

  ngOnInit() {
    this.user = this.authService.getLoggedUser();
    this.scheduleService.getCurrentSchedule().subscribe(
      schedule => {
        this.schedule = schedule
      }
    );
    this.scheduleService.updateCurrentSchedule();
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
