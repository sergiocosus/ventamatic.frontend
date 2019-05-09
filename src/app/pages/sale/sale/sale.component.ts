import { catchError, debounceTime, distinctUntilChanged, filter, map, mergeMap, tap } from 'rxjs/operators';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent, ConfirmDialogData } from '@app/shared/components/confirm-dialog/confirm-dialog.component';
import { Branch } from '@app/api/models/branch';
import { Client } from '@app/api/models/client';
import { ClientService } from '@app/api/services/client.service';
import { SaleService } from '@app/api/services/sale.service';
import { ScheduleService } from '@app/api/services/schedule.service';
import { TicketService } from '@app/api/services/ticket.service';
import { NotifyService } from '@app/shared/services/notify.service';
import { AutoUnsubscribe } from '@app/shared/decorators/auto-unsubscribe';
import { SubscriptionManager } from '@app/shared/classes/subscription-manager';
import { Observable, of } from 'rxjs';
import { AppValidators } from '@app/shared/app-validators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss'],
})
@AutoUnsubscribe()
export class SaleComponent implements OnInit {
  @ViewChild('myForm') ngForm: NgForm;

  branch: Branch;
  branch_id: number;

  clientIdControl: FormControl = new FormControl();
  client_status: string;

  printControl = new FormControl(true);

  messages = {
    cancelSale: {
      title: '¿Está seguro de cancelar la venta?',
      message: 'Los datos de la venta actual serán borrados',
    },
    clientNotExists: 'El cliente no existe',
    clientInvalid: 'No se ha seleccionado un cliente válido',
    noProductsAdded: 'No se han agregado productos',
    lowInventory: 'Insuficiente producto en inventario',
    paymentInvalid: 'El pago es inferior al monto Total',
    saleSuccess: '¡Venta completada satisfactoriamente!',
    searching: 'Buscando...'
  };

  private sub = new SubscriptionManager();
  form: FormGroup;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));


  get addedProducts() {
    return this.form.get('products') as FormArray;
  }

  constructor(private route: ActivatedRoute,
              private clientService: ClientService,
              private notify: NotifyService,
              private saleService: SaleService,
              private router: Router,
              private scheduleService: ScheduleService,
              private ticketService: TicketService,
              private dialog: MatDialog,
              private fb: FormBuilder,
              private breakpointObserver: BreakpointObserver
  ) {
    this.initClientIdControl();

    this.form = this.fb.group({
      client: [null, [Validators.required]],
      payment_type_id: [1, [Validators.required]],
      card_payment_id: [null, []],
      total: [],
      products: this.fb.array([], [AppValidators.minLength(1)]),
      client_payment: [null, [Validators.required]],
    });

    this.clientIdControl.setValue(1);

    this.form.get('client').valueChanges
      .pipe(filter(client => client instanceof Client))
      .subscribe(client => {
        this.clientIdControl.setValue(client.id, {emitEvent: false})
      });
  }

  ngOnInit() {
    this.sub.add = this.route.params.pipe(
      tap(params => this.branch_id = params['branch_id']),
      mergeMap(params => this.scheduleService.getCurrentSchedule()),
    ).subscribe(schedule => {
      if (!schedule) {
        this.router.navigateByUrl('/venta');
        return;
      }

      if (schedule.branch_id === this.branch_id) {
        this.branch = schedule.branch;
      } else {
        this.router.navigateByUrl(`/venta/${schedule.branch_id}`);
      }
    });
  }

  private initClientIdControl() {
    this.clientIdControl.valueChanges.pipe(
      debounceTime(250),
      distinctUntilChanged(),
      mergeMap(value => this.clientService.get(value).pipe(catchError(() => {
        this.client_status = this.messages.clientNotExists;
        return of([]);
      })))
    ).subscribe(
      client => {
        this.form.get('client').setValue(client);
        this.client_status = null;
      }
    );
  }

  addProduct(inventory) {
    const exist = this.addedProducts.controls.find(form => {
      return form.get('inventory').value.product_id === inventory.product.id;
    });

    if (exist) {
      if (inventory.quantity > exist.get('quantity').value) {
        exist.get('quantity').setValue(exist.get('quantity').value + 1);
      } else {
        this.notify.error(this.messages.lowInventory);
      }
    } else {
      if (inventory.quantity > 0) {
        this.addedProducts.push(this.createInventoryForm(inventory));
      } else {
        this.notify.error(this.messages.lowInventory);
      }
    }
  }

  private createInventoryForm(inventory) {
    return this.fb.group({
      inventory: [inventory],
      quantity: [1],
    });
  }

  confirm() {
    if (this.form.invalid) {
      if (this.form.get('products').hasError('minLength')) {
        this.notify.error('No se han agregado productos');
      } else {
        this.notify.alert('forms.error');
      }
      return;
    }

    if (!this.addedProducts.length) {
      this.notify.error(this.messages.noProductsAdded);
      return;
    }
    if (this.form.get('client_payment').value - this.total < 0) {
      this.notify.error(this.messages.paymentInvalid);
      return;
    }

    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: '¿Desea realizar la venta?',
      } as ConfirmDialogData
    }).afterClosed().pipe(filter(Boolean)).subscribe(() => this.finish());
  }


  get total() {
    let total = 0;
    this.addedProducts.controls.forEach(addedProduct => {
      total += addedProduct.get('inventory').value.current_price * addedProduct.get('quantity').value;
    });
    return Math.trunc(total * 100) / 100;
  }


  finish() {
    const data = this.form.getRawValue();

    const products = data.products.map(addedProduct => ({
      product_id: addedProduct.inventory.product_id,
      quantity: addedProduct.quantity
    }));

    this.saleService.post(this.branch_id, {
      client_id: data.client.id,
      payment_type_id: data.payment_type_id,
      card_payment_id: data.payment_type_id === 2 ? data.card_payment_id : null,
      total: this.total,
      client_payment: data.client_payment,
      products: products
    }).subscribe(
      sale => {
        if (this.printControl.value) {
          this.ticketService.putSale(sale);
        }
        this.notify.success('Éxito', this.messages.saleSuccess);
      },
      error => this.notifyError(error),
      () => this.clear()
    );
  }

  clear() {
    this.form.reset({
      client: null,
      payment_type_id: 1,
      card_payment_id: null,
      client_payment: null,
    });

    this.clientIdControl.setValue(1);

    while (this.addedProducts.length !== 0) {
      this.addedProducts.removeAt(0);
    }

    this.ngForm.reset();
    this.ngForm.resetForm();
  }

  cancel() {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: this.messages.cancelSale.title,
        message: this.messages.cancelSale.message,
      } as ConfirmDialogData
    }).afterClosed().pipe(filter(Boolean))
      .subscribe(() => this.clear());
  }

  notifyError(error) {
    if (error.code === 10) {
      this.notify.alert(error.message);
    } else {
      this.notify.error(error.message);
    }
  }
}
