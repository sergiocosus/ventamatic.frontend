import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {User} from '../../../user/classes/user';
import {Router} from '@angular/router';
import {ScheduleService} from '../../../user/services/schedule.service';
import {NotifyService} from '../../../shared/services/notify.service';
import {Branch} from '../../../branch/models/branch';
import {AuthService} from '../../../auth/services/auth.service';


@Component({
  selector: 'app-select-branch',
  templateUrl: './select-branch.component.html',
  styleUrls: ['./select-branch.component.scss'],
})
export class SelectBranchComponent implements OnInit, OnDestroy {
  private scheduleSubscription: Subscription;

  branches: Branch[] = [];
  initial_amount: number;
  selectedBranch: Branch;
  private user: User;
  constructor(private router: Router,
              private scheduleService: ScheduleService,
              private notify: NotifyService,
              private authService: AuthService
  ) {}

  ngOnInit() {

    this.scheduleSubscription = this.scheduleService.getCurrentSchedule().subscribe(
      schedule => {
        if (schedule){
          this.router.navigate(['/venta', schedule.branch_id]);
        }else {
          this.loadBranches();
        }
      }
    );
  }

  ngOnDestroy(): any {
    this.scheduleSubscription.unsubscribe();
  }

  loadBranches() {
    this.authService.getLoggedUser().subscribe(
      user => {
        this.user = user;
        this.branches = user.getBranchesWithPermission('sale');
      }
    );
  }

  submit(){
    this.scheduleService.post(this.selectedBranch.id, this.initial_amount).subscribe(
      schedule => {
        this.scheduleService.updateCurrentSchedule(schedule);
      },
      error => this.notify.serviceError(error)
    );
  }
}
