import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Branch} from '../../../branch/models/branch';
import {Supplier} from '../../../supplier/classes/supplier';
import {SupplierService} from '../../../supplier/services/supplier.service';
import {BranchService} from '../../../branch/services/branch.service';
import {AuthService} from '../../../auth/services/auth.service';
import {User} from '../../../user/classes/user';

@Component({
  selector: 'app-begin-buy',
  templateUrl: './begin-buy.component.html',
  styleUrls: ['./begin-buy.component.scss'],
})
export class BeginBuyComponent implements OnInit {
  @Output() buyStarted = new EventEmitter<BeginBuyDataInterface>();

  branches: Branch[];
  suppliers: Supplier[];
  formData: BeginBuyDataInterface;
  private user: User;

  constructor(private supplierService: SupplierService,
              private branchService: BranchService,
              private authService: AuthService) {
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

  start() {
    this.buyStarted.emit(this.formData);
  }

  clear() {
    this.formData = {
      branch: null,
      supplier: null,
      supplierBillID: null,
      introducedAmount: null
    };
  }
}


export interface BeginBuyDataInterface {
  branch: Branch;
  supplier: Supplier;
  supplierBillID: string;
  introducedAmount: number;
}
