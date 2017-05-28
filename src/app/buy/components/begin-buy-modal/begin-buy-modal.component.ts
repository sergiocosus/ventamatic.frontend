import {Component, OnInit, ViewChild, Output, EventEmitter, ElementRef} from '@angular/core';
import {SupplierService} from "../../../app/+proveedores/shared/supplier.service";
import {BranchService} from "../../../app/+sucursales/shared/branch.service";
import {Branch} from "../../../app/+sucursales/shared/branch";
import {Supplier} from "../../../app/+proveedores/shared/supplier";
import {AuthService} from "../../../services/auth.service";
import {User} from "../../../user/user";

@Component({
  selector: 'app-begin-buy-modal',
  templateUrl: 'begin-buy-modal.component.html',
  styleUrls: ['begin-buy-modal.component.scss'],
})
export class BeginBuyModalComponent implements OnInit {
  @Output('buy-started') buyStarted = new EventEmitter<BeginBuyDataInterface>();

  branches:Branch[];
  suppliers:Supplier[];
  formData:BeginBuyDataInterface;
  private user:User;

  constructor(private supplierService:SupplierService,
              private branchService:BranchService,
              private authService:AuthService) {
    this.clear();
  }


  ngOnInit() {
    this.supplierService.getAll().subscribe(
      suppliers => this.suppliers = suppliers
    );

    this.loadBranches();
  }

  loadBranches() {
    this.authService.getLoggedUser().subscribe(
      user => {
        this.user = user;
        this.branches = user.getBranchesWithPermission('buy');
      }
    );
  }

  start(){
    this.buyStarted.emit(this.formData);
  }

  clear() {
    this.formData = {
      branch:null,
      supplier:null,
      supplierBillID:null,
      introducedAmount:null
    };
  }
}


export interface BeginBuyDataInterface{
  branch:Branch;
  supplier:Supplier;
  supplierBillID:string;
  introducedAmount:number;
}
