import { catchError, debounceTime, distinctUntilChanged, finalize, mergeMap, tap } from 'rxjs/operators';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Client } from '@app/api/models/client';
import { ClientService } from '@app/api/services/client.service';
import { from, Observable } from 'rxjs';

@Component({
  selector: 'app-client-search',
  templateUrl: './client-search.component.html',
  styleUrls: ['./client-search.component.scss']
})
export class ClientSearchComponent implements OnInit {
  @Output() optionSelected = new EventEmitter();
  @Input() fieldControl: FormControl;
  @Input() placeholder = 'Nombre de cliente';

  companiesFound$: Observable<Client[]>;
  loading = false;


  constructor(private clientService: ClientService) {
  }

  ngOnInit() {
    this.initSearch();
  }

  /**
   * Initialize the immediate boss person field to search when there is changes
   */
  private initSearch() {
    this.companiesFound$ = this.fieldControl.valueChanges.pipe(
      tap(() => this.loading = true),
      debounceTime(250),
      distinctUntilChanged(), mergeMap(
        value => this.clientService.getSearch(value).pipe(
          catchError(err => from([])),
          finalize(() => this.loading = false)
        )
      )
    );
  }

  displayWith(client: Client) {
    return client ? client.name : '';
  }

}
