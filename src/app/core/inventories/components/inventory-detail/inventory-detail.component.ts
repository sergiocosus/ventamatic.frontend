import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Inventory} from '../../../../inventory/classes/inventory.model';
import {InventoryService} from '../../../../inventory/services/inventory.service';
import {NotifyService} from '../../../../shared/services/notify.service';
import {MdDialog, MdPaginator} from '@angular/material';
import {InventoryQuantityDialogComponent} from '../../../../inventory/components/inventory-quantity-dialog/inventory-quantity-dialog.component';
import {InventoryEditDialogComponent} from '../../../../inventory/components/inventory-edit-dialog/inventory-edit-dialog.component';
import {ReportDataSource} from '../../../../report/classes/report-data-source';

@Component({
  selector: 'app-inventory-detail',
  templateUrl: './inventory-detail.component.html',
  styleUrls: ['./inventory-detail.component.scss'],
})
export class InventoryDetailComponent implements OnInit, OnDestroy {
  @ViewChild(MdPaginator) paginator: MdPaginator;

  branch_id: number;
  inventories: Inventory[];

  dataSource: ReportDataSource | null;

  private sub;
  constructor(private route: ActivatedRoute,
              private inventoryService: InventoryService,
              private notify: NotifyService,
              private dialog: MdDialog) {}

  ngOnInit() {
    this.dataSource = new ReportDataSource(this.paginator);

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
