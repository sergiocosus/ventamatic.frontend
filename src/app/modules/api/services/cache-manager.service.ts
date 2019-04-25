import { Injectable } from '@angular/core';
import {AuthService} from '../../auth/services/auth.service';
import {BranchService} from '@app/api/services/branch.service';
import {CategoryService} from '@app/api/services/category.service';
import {SupplierCategoryService} from '@app/api/services/supplier-category.service';
import {BrandService} from '@app/api/services/brand.service';
import {BranchRoleService} from '@app/api/services/branch-role.service';
import {RoleService} from '@app/api/services/role.service';

@Injectable({
  providedIn: 'root'
})
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
