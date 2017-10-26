import {Observable} from 'rxjs/Observable';
import {DataSource} from '@angular/cdk/collections';
import {MdPaginator, MdSort} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export class ReportDataSource extends DataSource<any> {
  private dataChange = new BehaviorSubject<any>([]);

  formData: any;
  filterFunction: any;


  filteredData = [];

  constructor( private paginator: MdPaginator = null,
               private sort: MdSort = null,
               private sortFunction = null,
               private filter: Observable<any> = null) {
    super();
  }

  setData (data) {
    if (this.paginator) {
      this.paginator.pageIndex = 0;
    }

    this.updateData(data);
  }

  updateData(data) {
    this.dataChange.next(data);
  }

  get data () {
    return this.dataChange.value;
  }

  connect(): Observable<any[]> {
    const displayDataChanges = [
      this.dataChange,
      ...(this.paginator ? [this.paginator.page] : []),
      ...(this.sort ? [this.sort._matSortChange] : []),
      ...(this.filter ? [this.filter] : []),
    ];

    return Observable.merge(...displayDataChanges).map((a, b) => {
      let data = this.data.slice();
      // Grab the page's slice of data.
      if (this.filter && a.formData) {
        this.formData = a.formData;
        this.filterFunction = a.filter;
      }

      if ( this.formData ) {
        data = data.filter(this.filterData(this.formData, this.filterFunction));
      }

      if (this.sortFunction) {
        data = this.sortData(data);
      }

      this.filteredData = data;

      if (this.paginator) {
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        data = data.splice(startIndex, this.paginator.pageSize);
      }

      return data;
    });
  }

  disconnect() {}

  filterData(formData, filterFunction) {
    return (object) => {
      for (const key in formData) {
        const value = formData[key];
        if (formData[key] === null || formData[key] === '') {
          continue;
        }
        if (filterFunction(object, key , value)) {
          continue;
        } else {
          return false;
        }
      }
      return true;
    };
  }

  sortData(data: any[]): any[] {
    if (!this.sort.active || this.sort.direction === '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number|string = '';
      let propertyB: number|string = '';
      let type = null;

      [propertyA, propertyB, type] = this.sortFunction(a, b);

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      switch (type) {
        case 'number':
          return (valueA < valueB ? -1 : 1) * (this.sort.direction === 'asc' ? 1 : -1);
        case 'string':
          return (propertyA as string || '').localeCompare(propertyB as string || '')
            * (this.sort.direction === 'asc' ? 1 : -1);
      }

    });
  }
}
