import {Component, OnInit, OnDestroy} from '@angular/core';
import {BranchService} from "../../+sucursales/shared/branch.service";
import {Branch} from "../../+sucursales/shared/branch";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {ScheduleService} from "../../../user/schedule/schedule.service";
import {Dropdown, SelectItem} from 'primeng/primeng';
import {FloatingLabelComponent} from "../../../components/floating-label/floating-label.component";
import {Subscription} from "rxjs/Rx";

@Component({
  moduleId: module.id,
  selector: 'select-branch',
  templateUrl: 'select-branch.component.html',
  styleUrls: ['select-branch.component.css'],
  directives: [
    SelectBranchComponent,
    ROUTER_DIRECTIVES,
    Dropdown,
    FloatingLabelComponent,
  ]
})
export class SelectBranchComponent implements OnInit, OnDestroy {
  private scheduleSubscription:Subscription;

  branches:Branch[] = [];
  branchesSelect:SelectItem[];
  initial_amount:number;
  branch_id: number;
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
            this.branchesSelect = branches.map(branch => {
              return {label:branch.name, value:branch.id};
            });
          })
        }
      }
    );
  }

  ngOnDestroy():any {
    this.scheduleSubscription.unsubscribe();
  }

  submit(){
    this.scheduleService.post(this.branch_id, this.initial_amount).subscribe(
      schedule => {
        this.scheduleService.updateCurrentSchedule(schedule);
      }
    )
  }
}
