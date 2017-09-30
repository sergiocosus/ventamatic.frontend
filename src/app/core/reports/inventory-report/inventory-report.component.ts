  import {Component, OnInit, ViewChild} from '@angular/core';
import {ReportService} from '../../../report/report.service';
import {NotifyService} from '../../../shared/services/notify.service';
import {Category} from '../../../category/category';
import {messages} from '../../../shared/classes/messages';
  import {MdPaginator} from '@angular/material';
  import {BehaviorSubject} from 'rxjs/BehaviorSubject';
  import {Observable} from 'rxjs/Observable';
  import {DataSource} from '@angular/cdk/collections';
  import {Inventory} from '../../../inventory/classes/inventory.model';

@Component({
  selector: 'app-inventory-report',
  templateUrl: './inventory-report.component.html',
  styleUrls: ['./inventory-report.component.scss'],
})
export class InventoryReportComponent implements OnInit {
  inventories = [];

  request: {
    branch_id: number,
    product_id: number,
    quantity: number,
    price: number,
    minimum: string,
  };

  registeredProducts = null;
  productsWithExistences = null;
  priceValue = 0;
  costValue = 0;

  constructor(private reportService: ReportService,
              private notify: NotifyService) { }

  displayedColumns = [
    'branch',
    'id',
    'product',
    'categories',
    'brand',
    'quantity',
    'price',
    'total_price',
    'cost',
    'margin',
    'minimum',
  ];
  exampleDatabase = new ExampleDatabase();
  dataSource: ExampleDataSource | null;

  @ViewChild(MdPaginator) paginator: MdPaginator;



  ngOnInit() {
    this.resetRequest();
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator);

  }

  resetRequest() {
    this.request = {
      branch_id: null,
      product_id: null,
      quantity: null,
      price: null,
      minimum: null
    };
  }

  implode(categories: Category[]) {
    return categories.map(category => category.name)
      .join(', ');
  }

  resetStats() {
    this.registeredProducts = 0;
    this.productsWithExistences = 0;
    this.priceValue = 0;
    this.costValue = 0;
  }

  submit() {
    this.reportService.getInventory(this.request).subscribe(
      inventories => {
        this.inventories = inventories;
        this.resetStats();
        if (!this.inventories.length) {
          this.notify.alert(messages.report.voidBody, messages.report.voidTitle);
        }

        const inventoryIds = [];
        inventories.forEach( inventory => {
          this.calculateInventory(inventory);

          if (inventoryIds.indexOf(inventory.product_id) === -1) {
            inventoryIds.push(inventory.product_id);
          }

          if (inventory.quantity > 0) {
            this.productsWithExistences++;
          }

          this.priceValue += inventory.current_price * inventory.quantity;
          this.costValue += inventory.current_total_cost;
        });

        this.registeredProducts = inventoryIds.length;

        this.exampleDatabase.setData(inventories);
      },
      error => this.notify.serviceError(error)
    );
  }

  calculateInventory(inventory:any) {
    inventory.categoryString = inventory.product.toStringCategories();
    inventory.subtotalPrice = inventory.quantity * inventory.current_price;

    const margin = (inventory.current_price - inventory.current_total_cost) / inventory.current_total_cost;
    if (Number.isSafeInteger(margin)) {
      inventory.margin = margin;
    }
  }

  downloadCSV() {
    this.reportService.downloadCSV(this.inventories.map(
      inventory => ({
        sucursal_id: inventory.branch_id,
        sucursal_nombre: inventory.branch.name,
        producto_id: inventory.product_id,
        codigo_barras: inventory.product.bar_code,
        producto_descripcion: inventory.product.description,
        minimo: inventory.minimum,
        cantidad: inventory.quantity,
        precio: inventory.current_price,
        precio_total: inventory.price * inventory.quantity,
        costo: inventory.current_total_cost,
      })
    ), `inventario-${new Date().toISOString()}`);
  }
}


  /** An example database that the data source uses to retrieve data for the table. */
  export class ExampleDatabase {
    /** Stream that emits whenever the data has been modified. */
    dataChange: BehaviorSubject<Inventory[]> = new BehaviorSubject<Inventory[]>([]);
    get data(): Inventory[] { return this.dataChange.value; }

    constructor() {
      // Fill up the database with 100 users.

    }

    /** Adds a new user to the database. */
    setData(data) {
      this.dataChange.next(data);
    }


  }

  /**
   * Data source to provide what data should be rendered in the table. Note that the data source
   * can retrieve its data in any way. In this case, the data source is provided a reference
   * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
   * the underlying data. Instead, it only needs to take the data and send the table exactly what
   * should be rendered.
   */
  export class ExampleDataSource extends DataSource<any> {
    constructor(private _exampleDatabase: ExampleDatabase, private _paginator: MdPaginator) {
      super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<Inventory[]> {
      const displayDataChanges = [
        this._exampleDatabase.dataChange,
        this._paginator.page,
      ];

      return Observable.merge(...displayDataChanges).map(() => {
        const data = this._exampleDatabase.data.slice();

        // Grab the page's slice of data.
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        return data.splice(startIndex, this._paginator.pageSize);
      });
    }

    disconnect() {}
  }
