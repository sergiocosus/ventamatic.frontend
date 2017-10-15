import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Inventory} from '../../../../inventory/classes/inventory.model';
import {InventoryService} from '../../../../inventory/services/inventory.service';
import {NotifyService} from '../../../../shared/services/notify.service';
import {MdDialog, MdPaginator, MdSort} from '@angular/material';
import {InventoryQuantityDialogComponent} from '../../../../inventory/components/inventory-quantity-dialog/inventory-quantity-dialog.component';
import {InventoryEditDialogComponent} from '../../../../inventory/components/inventory-edit-dialog/inventory-edit-dialog.component';
import {ReportDataSource} from '../../../../report/classes/report-data-source';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-inventory-detail',
  templateUrl: './inventory-detail.component.html',
  styleUrls: ['./inventory-detail.component.scss'],
})
export class InventoryDetailComponent implements OnInit, OnDestroy {
  @ViewChild(MdPaginator) paginator: MdPaginator;
  @ViewChild(MdSort) sort: MdSort;

  dataSourceObservable: Observable<any[]>;

  branch_id: number;
  inventories: Inventory[];

  dataSource: ReportDataSource | null;

  private sub;
  constructor(private route: ActivatedRoute,
              private inventoryService: InventoryService,
              private notify: NotifyService,
              private dialog: MdDialog) {}

  ngOnInit() {
    this.dataSource = new ReportDataSource(this.paginator,
      this.sort,
      (a, b) => {
        switch (this.sort.active) {
          case 'id': return [a.product.id, b.product.id, 'number'];
          case 'product': return [a.product.description, b.product.description, 'string'];
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
          case 'unit': return [a.product.unit.name, b.product.unit.name, 'string'];
        }
      });

    this.dataSourceObservable = this.dataSource.connect();


    this.sub = this.route.params.subscribe(params => {
      this.branch_id = params['branch_id'];
      this.inventoryService.getAll(this.branch_id).subscribe(
        inventories => {
          this.inventories = inventories;
          this.dataSource.setData(inventories);
        },
        error => this.notify.serviceError(error)
      );
    });
  }

  ngOnDestroy(): any {
    this.sub.unsubscribe();
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
}
