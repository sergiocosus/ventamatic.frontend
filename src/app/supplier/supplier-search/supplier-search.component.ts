import {Component, OnInit, ViewChild, Output, EventEmitter, HostListener} from '@angular/core';
import {SelectableComponent} from '../../shared/selectable/selectable.component';
import {PopoverComponent} from '../../shared/popover/popover.component';
import {FormControl} from '@angular/forms';
import {SupplierService} from '../../+app/+proveedores/shared/supplier.service';
import {NotifyService} from '../../services/notify.service';
import {Supplier} from '../../+app/+proveedores/shared/supplier';

@Component({
  selector: 'app-supplier-search',
  templateUrl: './supplier-search.component.html',
  styleUrls: ['./supplier-search.component.scss']
})
export class SupplierSearchComponent implements OnInit {
  @ViewChild(SelectableComponent) selectable:SelectableComponent;
  @ViewChild(PopoverComponent) popover:PopoverComponent;
  @Output() selected = new EventEmitter();

  @HostListener('keydown', ['$event']) onKeyDown($event) {
    return this.selectable.keydown($event);
  }

  loading = false;

  id: number;
  name: string;

  idControl = new FormControl();
  nameControl = new FormControl();

  suppliers: Supplier[] = null;


  constructor(private supplierService: SupplierService,
              private notify: NotifyService) {
    this.idControl.valueChanges.debounceTime(250).distinctUntilChanged()
      .subscribe(value => {
        this.startLoading();
        if (!value  || value === '' ) { return; }
        this.supplierService.get(value).subscribe(
          supplier => this.setSuppliers([supplier]),
          error => {
            this.suppliers = null;
            this.loading = false;
          }
        );
      });

    this.nameControl.valueChanges.debounceTime(250).distinctUntilChanged()
      .subscribe(value => {
        this.startLoading();
        if (!value  || value === '' ) { return; }
        this.supplierService.getSearch(value).subscribe(
          suppliers => this.setSuppliers(suppliers),
          error => this.notify.serviceError(error)
        );
      });
  }


  startLoading() {
    this.suppliers = null;
    this.loading = true;
  }

  setSuppliers(suppliers: Supplier[]) {
    this.suppliers = suppliers;
    this.loading = false;
  }

  select($event) {
    this.selected.emit($event);
    this.popover.hidden = true;
  }

  ngOnInit() {
  }

}
