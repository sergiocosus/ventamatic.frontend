import {Component, OnInit, ViewChild, Output, EventEmitter, ElementRef} from '@angular/core';
import {SupplierService} from "../../../+app/+proveedores/shared/supplier.service";
import {BranchService} from "../../../+app/+sucursales/shared/branch.service";
import {Branch} from "../../../+app/+sucursales/shared/branch";
import {Supplier} from "../../../+app/+proveedores/shared/supplier";
import {ModalComponent} from "ng2-bs3-modal/components/modal";
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
  branchesItems:any[];
  suppliers:Supplier[];
  suppliersItems:any[];
  formData:BeginBuyDataInterface;
  private user:User;

  constructor(private supplierService:SupplierService,
              private branchService:BranchService,
              private authService:AuthService) {
    this.clear();
  }


  ngOnInit() {
    this.supplierService.getAll().subscribe(
      suppliers => {
        this.suppliers = suppliers;
        this.suppliersItems = this.suppliers.map(
          (supplier:Supplier) => ({text:supplier.name, id:supplier, model:supplier})
        )
      }
    );

    this.loadBranches();
  }

  loadBranches() {
    this.authService.getLoggedUser().subscribe(
      user => {
        this.user = user;
        this.branches = user.getBranchesWithPermission('buy');
        this.branchesItems = this.branches.map(
          (branch:Branch) => ({text:branch.name, id:branch, model:branch})
        )
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
  log(data){
    console.log(data);
  }
}


export interface BeginBuyDataInterface{
  branch:Branch;
  supplier:Supplier;
  supplierBillID:string;
  introducedAmount:number;
}
