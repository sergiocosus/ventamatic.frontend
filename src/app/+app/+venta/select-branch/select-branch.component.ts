import {Component, OnInit, OnDestroy} from '@angular/core';
import {BranchService} from "../../+sucursales/shared/branch.service";
import {Branch} from "../../+sucursales/shared/branch";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {ScheduleService} from "../../../user/schedule/schedule.service";
import {Dropdown, SelectItem} from 'primeng/primeng';
import {FloatingLabelComponent} from "../../../components/floating-label/floating-label.component";
import {Subscription} from "rxjs/Rx";
import {InputLabelComponent} from "../../../components/input-label/input-label.component";

@Component({
  moduleId: module.id,
  selector: 'select-branch',
  templateUrl: 'select-branch.component.html',
  styleUrls: ['select-branch.component.css'],
  directives: [
    SelectBranchComponent,
    ROUTER_DIRECTIVES,
    Dropdown,
    InputLabelComponent
  ]
})
export class SelectBranchComponent implements OnInit, OnDestroy {
  private scheduleSubscription:Subscription;

  branches:Branch[] = [];
  initial_amount:number;
  selectedBranch: Branch;
  constructor(private router:Router,
              private branchService:BranchService,
              private scheduleService:ScheduleService
  ) {}

  ngOnInit() {
    this.scheduleSubscription = this.scheduleService.getCurrentSchedule().subscribe(
      schedule => {
        if(schedule){
          this.router.navigate(['/app/venta', schedule.branch_id]);
        }else {
          this.branchService.getAll().subscribe( branches => {
            this.branches = branches;
           /* this.branchesSelect = branches.map(branch => {
              return {label:branch.name, value:branch.id};
            });*/
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
      }
    )
  }
}
