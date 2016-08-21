import { Component, OnInit, ViewChild} from '@angular/core';
import {NotificationsService} from "angular2-notifications/components";
import {BranchService} from "./shared/branch.service";
import {Branch} from "./shared/branch";
import {BranchModalComponent} from "./branch-modal/branch-modal.component";
import {BranchItemComponent} from "./branch-item/branch-item.component";
import {MainContentComponent} from "../../shared/main-content/main-content.component";

@Component({
  selector: 'app-sucursales',
  templateUrl: 'sucursales.component.html',
  styleUrls: ['sucursales.component.scss'],
  directives: [
    MainContentComponent,
    BranchModalComponent,
    BranchItemComponent
  ]
})
export class SucursalesComponent implements OnInit {
  @ViewChild(BranchModalComponent) private branchModal:BranchModalComponent;

  branches:Branch[];

  constructor(private branchService:BranchService,
              private notification:NotificationsService) {}

  ngOnInit():any {
    this.branchService.getAll().subscribe(
      branches => this.branches = branches
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
