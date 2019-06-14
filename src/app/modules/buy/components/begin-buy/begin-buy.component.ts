import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { Branch } from '@app/api/models/branch';
import { Supplier } from '@app/api/models/supplier';
import { SupplierService } from '@app/api/services/supplier.service';
import { BranchService } from '@app/api/services/branch.service';
import { AuthService } from '@app/auth/services/auth.service';
import { User } from '@app/api/models/user';
import { environment } from '../../../../../environments/environment';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotifyService } from '@app/shared/services/notify.service';

@Component({
  selector: 'app-begin-buy',
  templateUrl: './begin-buy.component.html',
  styleUrls: ['./begin-buy.component.scss'],
})
export class BeginBuyComponent implements OnInit {
  @Input() form: FormGroup;
  @Output() buyStarted = new EventEmitter();
  @HostBinding('class.box') box = true;

  buyEnvironment = environment.buy;
  branches: Branch[];
  suppliers: Supplier[];
  user: User;

  constructor(private supplierService: SupplierService,
              private branchService: BranchService,
              private authService: AuthService,
              private fb: FormBuilder,
              private notify: NotifyService) {
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
        if (this.branches.length) {
          this.form.get('branch').setValue(this.branches[0]);
        }
      }
    );
  }

  start() {
    if (this.form.get('branch').invalid ||
      this.form.get('supplier').invalid ||
      this.form.get('introduced_amount').invalid ||
      this.form.get('supplier_bill_id').invalid) {
      this.notify.alert('Faltan datos o son erróneos');
      return;
    }

    this.buyStarted.emit(true);
  }
}
