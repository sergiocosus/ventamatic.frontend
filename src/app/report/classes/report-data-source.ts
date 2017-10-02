import {Observable} from 'rxjs/Observable';
import {DataSource} from '@angular/cdk/collections';
import {MdPaginator} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export class ReportDataSource extends DataSource<any> {
  private dataChange = new BehaviorSubject<any>([]);

  constructor( private paginator: MdPaginator) {
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
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      const data = this.data.slice();
      // Grab the page's slice of data.
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    });
  }

  disconnect() {}
}
