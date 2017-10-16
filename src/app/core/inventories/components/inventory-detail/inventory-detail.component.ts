import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Inventory} from '../../../../inventory/classes/inventory.model';
import {InventoryService} from '../../../../inventory/services/inventory.service';
import {NotifyService} from '../../../../shared/services/notify.service';
import {MdDialog, MdPaginator, MdSort} from '@angular/material';
import {InventoryQuantityDialogComponent} from '../../../../inventory/components/inventory-quantity-dialog/inventory-quantity-dialog.component';
import {InventoryEditDialogComponent} from '../../../../inventory/components/inventory-edit-dialog/inventory-edit-dialog.component';
import {ReportDataSource} from '../../../../report/classes/report-data-source';
import {Observable} from 'rxjs/Observable';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {CategoryService} from '../../../../category/category.service';
import {BrandService} from '../../../../brand/brand.service';
import {Category} from '../../../../category/category';
import {Brand} from '../../../../brand/brand';
import {units} from '../../../../shared/unit/units.data';

@Component({
  selector: 'app-inventory-detail',
  templateUrl: './inventory-detail.component.html',
  styleUrls: ['./inventory-detail.component.scss'],
})
export class InventoryDetailComponent implements OnInit, OnDestroy {
  @ViewChild(MdPaginator) paginator: MdPaginator;
  @ViewChild(MdSort) sort: MdSort;

  form: FormGroup;

  dataSourceObservable: Observable<any[]>;

  branch_id: number;
  inventories: Inventory[];
  branchControl = new FormControl();

  dataSource: ReportDataSource | null;
  brands: Observable<Brand[]>;
  categories: Observable<Category[]>;
  units = [];

  private sub;

  constructor(private route: ActivatedRoute,
              private inventoryService: InventoryService,
              private notify: NotifyService,
              private dialog: MdDialog,
              private router: Router,
              private fb: FormBuilder,
              private categoryService: CategoryService,
              private brandService: BrandService) {

    this.form = this.fb.group({
      'id': [''],
      'product': [''],
      'bar_code': [''],
      'categories': [''],
      'brand': [''],
      'minimum': [''],
      'quantity': [''],
      'branchPrice': [''],
      'globalPrice': [''],
      'lastCost': [''],
      'unit': [''],
      'minimum_filter': [''],
    });

  }

  ngOnInit() {
    this.initReportDataSource();
    this.initFormData();

    this.sub = this.route.params.subscribe(params => {
      this.branch_id = params['branch_id'];
      this.loadData();
    });
  }

  ngOnDestroy(): any {
    this.sub.unsubscribe();
  }

  initFormData() {
    this.categories = this.categoryService.getAllCached();
    this.brands = this.brandService.getAllCached();
    Object.keys(units).forEach(key => {
      this.units.push(Object.assign({id: key}, units[key] ));
    });

  }

  initReportDataSource() {
    this.dataSource = new ReportDataSource(this.paginator,
      this.sort,
      (a, b) => {
        switch (this.sort.active) {
          case 'id': return [a.product.id, b.product.id, 'number'];
          case 'product': return [a.product.description, b.product.description, 'string'];
          case 'bar_code': return [a.product.bar_code, b.product.bar_code, 'string'];
          case 'categories': return [a.product.toStringCategories(), b.product.toStringCategories(), 'string'];
          case 'brand': return [
            (a.product.brand ? a.product.brand.name : ''),
            (b.product.brand ? b.product.brand.name : ''),
            'string'
          ];
          case 'minimum': return [a.minimum, b.minimum, 'number'];
          case 'quantity': return [a.quantity, b.quantity, 'number'];
          case 'branchPrice': return [a.price, b.price, 'number'];
          case 'globalPrice': return [a.product.price, b.product.price, 'number'];
          case 'lastCost': return [a.last_cost, b.last_cost, 'number'];
          case 'unit': return [a.product.unit.name, b.product.unit.name, 'string'];
        }
      },
      this.form.valueChanges.map(formData => {
          return {
            formData: formData,
            filter: this.fieldIsOk.bind(this)
          };
        }
      )
    );

    this.dataSourceObservable = this.dataSource.connect();
  }

  loadData () {
    this.inventoryService.getAll(this.branch_id).subscribe(
      inventories => {
        this.inventories = inventories;
        this.dataSource.setData(inventories);
      },
      error => this.notify.serviceError(error)
    );
  }

  clickUpdate($event, inventory: Inventory) {
    $event.stopPropagation();
    const inventoryQuantityDialog = this.dialog.open(InventoryQuantityDialogComponent);
    inventoryQuantityDialog.componentInstance.init(inventory);
    inventoryQuantityDialog.componentInstance.updated.subscribe(
      inventories => inventories.forEach(
        updatedInventory => this.updated(updatedInventory)
      )
    );
  }

  updated(inventory: Inventory) {
    for ( const index in this.inventories ) {
      if (this.inventories[index].product_id === inventory.product_id) {
        this.inventories[index] = inventory;
        return;
      }
    }
  }

  openUpdateDialog(inventory: Inventory) {
    const dialog = this.dialog.open(InventoryEditDialogComponent);
    dialog.componentInstance.init(inventory);
    dialog.componentInstance.updated.subscribe(
      updatedInventory => this.updated(updatedInventory)
    );
  }

  fieldIsOk(object, key, value) {
    switch (key) {
      case 'id': return object.product.id == value;
      case 'product': return object.product.description.toLocaleLowerCase().search(value.toLowerCase()) >= 0;
      case 'bar_code': return object.product.bar_code == value;
      case 'categories': return object.product.categories.find(category => category.id == value);
      case 'brand': return object.product.brand_id == value;
      case 'minimum': return object.minimum == value;
      case 'quantity': return object.quantity == value;
      case 'branchPrice': return object.price == value;
      case 'globalPrice': return object.product.price == value;
      case 'lastCost': return object.last_cost == value;
      case 'unit': return object.product.unit_id == value;
      case 'minimum_filter': return value ? object.quantity <= object.current_minimum : true;
    }
    return true;
  }
}
