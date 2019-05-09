import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { from, Observable } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, finalize, mergeMap, tap } from 'rxjs/operators';
import { Inventory } from '@app/api/models/inventory.model';
import { InventoryService } from '@app/api/services/inventory.service';

@Component({
  selector: 'app-inventory-search',
  templateUrl: './inventory-search.component.html',
  styleUrls: ['./inventory-search.component.scss']
})
export class InventorySearchComponent implements OnInit {
  @Output() optionSelected = new EventEmitter();
  @Input() fieldControl: FormControl;
  @Input() placeholder = 'Nombre del producto';
  @Input() branch_id: number;
  @Input() tab_index: number;

  inventoriesFound$: Observable<Inventory[]>;
  loading = false;


  constructor(private inventoryService: InventoryService) {
  }

  ngOnInit() {
    this.initSearch();
  }

  /**
   * Initialize the field control to search when there is changes
   */
  private initSearch() {
    this.inventoriesFound$ = this.fieldControl.valueChanges.pipe(
      tap(() => this.loading = true),
      debounceTime(250),
      distinctUntilChanged(), mergeMap(
        value => this.inventoryService.search(this.branch_id, value).pipe(
          catchError(err => from([])),
          finalize(() => this.loading = false)
        ),
      )
    );
  }

  displayWith(inventory: Inventory) {
    return inventory ? inventory.product.description : '';
  }
}
