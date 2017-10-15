import {Observable} from 'rxjs/Observable';
import {DataSource} from '@angular/cdk/collections';
import {MdPaginator, MdSort} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export class ReportDataSource extends DataSource<any> {
  private dataChange = new BehaviorSubject<any>([]);
  constructor( private paginator: MdPaginator,
               private sort: MdSort = null,
               private sortFunction = null) {
    super();
  }

  setData (data) {
    this.paginator.pageIndex = 0;
    this.dataChange.next(data);
  }

  get data () {
    return this.dataChange.value;
  }

  connect(): Observable<any[]> {
    const displayDataChanges = [
      this.dataChange,
      this.paginator.page,
      ...(this.sort ? [this.sort._matSortChange] : []),
    ];

    return Observable.merge(...displayDataChanges).map((a, b) => {
      let data = this.data.slice();
      // Grab the page's slice of data.
      if (this.sortFunction) {
        data = this.sortData(data);
      }

      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    });
  }

  disconnect() {}

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
