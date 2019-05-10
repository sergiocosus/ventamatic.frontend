import { catchError, debounceTime, distinctUntilChanged, filter, finalize, map, mergeMap, tap } from 'rxjs/operators';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Client } from '@app/api/models/client';
import { ClientService } from '@app/api/services/client.service';
import { from, Observable } from 'rxjs';
import { BaseFormControlWrapperValueAccessor } from '@app/shared/classes/base-form-control-wrapper-value-accessor';

@Component({
  selector: 'app-client-search',
  templateUrl: './client-search.component.html',
  styleUrls: ['./client-search.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ClientSearchComponent),
    multi: true
  }]
})
export class ClientSearchComponent extends BaseFormControlWrapperValueAccessor implements OnInit {
  @Input() placeholder = 'Nombre de cliente';

  formControl: FormControl;
  clientsFound$: Observable<Client[]>;
  loading = false;


  constructor(private clientService: ClientService) {
    super();
  }

  ngOnInit() {
    this.initSearch();
  }

  /**
   * Initialize the immediate boss person field to search when there is changes
   */
  private initSearch() {
    this.clientsFound$ = this.formControl.valueChanges.pipe(
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

  registerOnChange(fn: any): void {
    this.sub.add = this.formControl.valueChanges.pipe(
      map(value => typeof value === 'string' ? null : value),
      filter(value => value instanceof Client || !value)
    ).subscribe(fn);
  }

}
