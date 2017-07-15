import { Injectable } from '@angular/core';
import {AuthService} from '../../auth/services/auth.service';
import {BranchService} from '../../branch/services/branch.service';
import {CategoryService} from '../../category/category.service';
import {SupplierCategoryService} from '../../supplier/services/supplier-category.service';
import {BrandService} from '../../brand/brand.service';
import {BranchRoleService} from '../../rol/services/branch-role.service';
import {RoleService} from '../../rol/services/role.service';

@Injectable()
export class CacheManagerService {

  constructor(private auth: AuthService,
              private branchService: BranchService,
              private categoryService: CategoryService,
              private supplierCategoryService: SupplierCategoryService,
              private brandService: BrandService,
              private branchRoleService: BranchRoleService,
              private roleService: RoleService) {
    console.log('initianting');
      this.auth.hasLogout().subscribe(() => {
        console.log('has logout');
        this.branchService.clearCache();
        this.categoryService.clearCache();
        this.supplierCategoryService.clearCache();
        this.brandService.clearCache();
        this.branchRoleService.clearCache();
        this.roleService.clearCache();
      });
  }

}
