import { Component, OnInit, ViewChild} from '@angular/core';
import {BranchService} from "./shared/branch.service";
import {Branch} from "./shared/branch";
import {BranchModalComponent} from "./branch-modal/branch-modal.component";
import {NotifyService} from "../../services/notify.service";

@Component({
  selector: 'app-sucursales',
  templateUrl: 'sucursales.component.html',
  styleUrls: ['sucursales.component.scss']
})
export class SucursalesComponent implements OnInit {
  @ViewChild(BranchModalComponent) private branchModal:BranchModalComponent;

  branches:Branch[];

  constructor(private branchService:BranchService,
              private notify:NotifyService) {}

  ngOnInit():any {
    this.branchService.getAll().subscribe(
      branches => this.branches = branches,
      error => this.notify.serviceError(error)
    )
  }

  update(branch:Branch){
    this.branchModal.openUpdate(branch);
  }

  created(branch:Branch){
    this.branches.unshift(branch);
  }

  deleted(branch:Branch){
    var index = this.branches.indexOf(branch);
    if (index > -1) {
      this.branches.splice(index, 1);
    }
  }


}
