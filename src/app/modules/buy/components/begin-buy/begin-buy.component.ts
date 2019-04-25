import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Branch} from '../../../api/models/branch';
import {Supplier} from '../../../api/models/supplier';
import {SupplierService} from '../../../api/services/supplier.service';
import {BranchService} from '../../../api/services/branch.service';
import {AuthService} from '../../../auth/services/auth.service';
import {User} from '../../../api/models/user';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-begin-buy',
  templateUrl: './begin-buy.component.html',
  styleUrls: ['./begin-buy.component.scss'],
})
export class BeginBuyComponent implements OnInit {
  @Output() buyStarted = new EventEmitter<BeginBuyDataInterface>();

  buyEnvironment = environment.buy;

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
        this.formData.branch = this.branches.length ? this.branches[0] : null;
      }
    );
  }

  start() {
    this.buyStarted.emit(this.formData);
  }

  clear() {
    if (!this.formData) {
      this.formData = {
        branch: null,
        supplier: null,
        supplierBillID: null,
        introducedAmount: null
      };
    } else {
      this.formData.supplier = null;
      this.formData.supplierBillID = null;
      this.formData.introducedAmount = null;
    }
  }
}


export interface BeginBuyDataInterface {
  branch: Branch;
  supplier: Supplier;
  supplierBillID: string;
  introducedAmount: number;
}
