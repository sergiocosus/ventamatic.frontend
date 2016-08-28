import {Component, OnInit, ViewChild, Output, EventEmitter, ElementRef} from '@angular/core';
import {SupplierService} from "../../../+app/+proveedores/shared/supplier.service";
import {BranchService} from "../../../+app/+sucursales/shared/branch.service";
import {Branch} from "../../../+app/+sucursales/shared/branch";
import {Supplier} from "../../../+app/+proveedores/shared/supplier";
import {MODAL_DIRECTIVES} from "ng2-bs3-modal/ng2-bs3-modal";
import {ModalComponent} from "ng2-bs3-modal/components/modal";
import {InputLabelComponent} from "../../../components/input-label/input-label.component";

@Component({
  selector: 'app-begin-buy-modal',
  templateUrl: 'begin-buy-modal.component.html',
  styleUrls: ['begin-buy-modal.component.scss'],
})
export class BeginBuyModalComponent implements OnInit {
  @ViewChild(ModalComponent) protected modal:ModalComponent;
  @ViewChild('selectBranch') selectBranch:ElementRef;
  @Output('buy-started') buyStarted = new EventEmitter<BeginBuyDataInterface>();

  branches:Branch[];
  suppliers:Supplier[];

  formData:BeginBuyDataInterface;

  constructor(private supplierService:SupplierService,
              private branchService:BranchService) {
    this.clear();
  }


  ngOnInit() {
    this.supplierService.getAll().subscribe(
      suppliers => this.suppliers = suppliers
    );

    this.branchService.getAll().subscribe(
      branches => this.branches = branches
    );
  }

  start(){
    this.buyStarted.emit(this.formData);
    this.close();
  }

  open(){
    this.modal.open();
    setTimeout(() => {
      this.selectBranch.nativeElement.focus();
    });
  }

  close(){
    this.modal.close();
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
