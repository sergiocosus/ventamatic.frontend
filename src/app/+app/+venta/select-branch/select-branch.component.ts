import {Component, OnInit, OnDestroy} from '@angular/core';
import {BranchService} from "../../+sucursales/shared/branch.service";
import {Branch} from "../../+sucursales/shared/branch";
import { Router} from "@angular/router";
import {ScheduleService} from "../../../user/schedule/schedule.service";
import {Subscription} from "rxjs/Rx";
import {NotifyService} from "../../../services/notify.service";

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
  constructor(private router:Router,
              private branchService:BranchService,
              private scheduleService:ScheduleService,
              private notify:NotifyService
  ) {}

  ngOnInit() {
    this.scheduleSubscription = this.scheduleService.getCurrentSchedule().subscribe(
      schedule => {
        if(schedule){
          this.router.navigate(['/app/venta', schedule.branch_id]);
        }else {
          this.branchService.getAll().subscribe( branches => {
            this.branches = branches;
          })
        }
      }
    );
  }

  ngOnDestroy():any {
    this.scheduleSubscription.unsubscribe();
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
