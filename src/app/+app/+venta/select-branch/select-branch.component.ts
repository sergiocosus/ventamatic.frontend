import {Component, OnInit, OnDestroy} from '@angular/core';
import {BranchService} from "../../+sucursales/shared/branch.service";
import {Branch} from "../../+sucursales/shared/branch";
import { Router} from "@angular/router";
import {ScheduleService} from "../../../user/schedule/schedule.service";
import {Subscription} from "rxjs/Rx";
import {NotifyService} from "../../../services/notify.service";
import {AuthService} from "../../../services/auth.service";
import {User} from "../../../user/user";

@Component({
  selector: 'select-branch',
  templateUrl: 'select-branch.component.html',
  styleUrls: ['select-branch.component.scss'],
})
export class SelectBranchComponent implements OnInit, OnDestroy {
  private scheduleSubscription:Subscription;

  branches:Branch[] = [];
  initial_amount:number;
  selectedBranch: Branch;
  branchesItems:any[] = [];
  private user:User;
  constructor(private router:Router,
              private scheduleService:ScheduleService,
              private notify:NotifyService,
              private authService:AuthService
  ) {}

  ngOnInit() {

    this.scheduleSubscription = this.scheduleService.getCurrentSchedule().subscribe(
      schedule => {
        if(schedule){
          this.router.navigate(['/venta', schedule.branch_id]);
        }else {
          this.loadBranches();
        }
      }
    );
  }

  ngOnDestroy():any {
    this.scheduleSubscription.unsubscribe();
  }

  loadBranches() {
    this.authService.getLoggedUser().subscribe(
      user => {
        this.user = user;
        this.branches = user.getBranchesWithPermission('sale');
        this.branchesItems = this.branches.map(
          (branch:Branch) => ({text:branch.name, id:branch, model:branch})
        )
      }
    );
  }

  submit(){
    console.log(this.selectedBranch);
    this.scheduleService.post(this.selectedBranch.id, this.initial_amount).subscribe(
      schedule => {
        this.scheduleService.updateCurrentSchedule(schedule);
      },
      error => this.notify.serviceError(error)
    )
  }
}
