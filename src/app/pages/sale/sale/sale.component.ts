import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Inventory } from '@app/api/models/inventory.model';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '@app/shared/components/confirm-dialog/confirm-dialog.component';
import { FindProductComponent } from '@app/product/components/find-product/find-product.component';
import { Branch } from '@app/api/models/branch';
import { Client } from '@app/api/models/client';
import { ClientService } from '@app/api/services/client.service';
import { SaleService } from '@app/api/services/sale.service';
import { ScheduleService } from '@app/api/services/schedule.service';
import { TicketService } from '@app/api/services/ticket.service';
import { NotifyService } from '@app/shared/services/notify.service';
import { AutoUnsubscribe } from '@app/shared/decorators/auto-unsubscribe';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss'],
})
@AutoUnsubscribe()
export class SaleComponent implements OnInit {
  @ViewChild(FindProductComponent) protected findProduct: FindProductComponent;

  addedProducts: ProductSale[] = [];

  branch: Branch;
  branch_id: number;

  client_id = 1;
  clientIdControl: FormControl = new FormControl();
  client: Client;
  client_status: string;

  payment: number = null;

  selectedPaymentType = {
    payment_type_id: 1,
    card_payment_id: null,
  };

  print = true;

  private messages = {
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

  private sub;

  constructor(private route: ActivatedRoute,
              private clientService: ClientService,
              private notify: NotifyService,
              private saleService: SaleService,
              private router: Router,
              private scheduleService: ScheduleService,
              private ticketService: TicketService,
              private dialog: MatDialog,
  ) {
    this.initClientIdControl();
  }

  ngOnInit() {
    this.sub.add = this.route.params.subscribe(params => {
      this.branch_id = params['branch_id'];

      this.sub.add = this.scheduleService.getCurrentSchedule().subscribe(
        schedule => {
          if (schedule) {
            if (schedule.branch_id === this.branch_id) {
              this.branch = schedule.branch;
            } else {
              this.router.navigate(['/venta', schedule.branch_id]);
            }
          } else {
            this.router.navigate(['/venta']);
          }
        }
      );
    });
  }

  private initClientIdControl() {
    this.clientIdControl.valueChanges.pipe(distinctUntilChanged())
      .subscribe(value => {
        this.client = null;
        this.client_status = this.messages.searching;
      });

    this.clientIdControl.valueChanges.pipe(debounceTime(250), distinctUntilChanged(),)
      .subscribe(value => {
        this.clientService.get(value).subscribe(
          client => {
            this.client = client;
            this.client_status = null;
          },
          error => this.client_status = this.messages.clientNotExists
        );
      });
  }

  addProduct(inventory) {
    const exist = this.addedProducts.filter(productSale => {
      return productSale.inventory.product.id === inventory.product.id;
    });

    if (exist.length) {
      if (inventory.quantity > exist[0].quantity) {
        exist[0].quantity++;
      } else {
        this.notify.error(
          'Error', this.messages.lowInventory
        );
      }
    } else {
      if (inventory.quantity > 0) {
        this.addedProducts.push({
          inventory: inventory,
          quantity: 1
        });
      } else {
        this.notify.error(
          'Error', this.messages.lowInventory
        );
      }
    }

    this.clearSearchInputs();
  }


  private clearSearchInputs() {
    this.findProduct.clear();
  }

  confirm() {
    if (!this.client) {
      this.notify.error(
        'Error', this.messages.clientInvalid
      );
      return;
    }
    if (!this.addedProducts.length) {
      this.notify.error(
        'Error', this.messages.noProductsAdded);
      return;
    }
    if (this.payment - this.total < 0) {
      this.notify.error(
        'Error', this.messages.paymentInvalid);
      return;
    }

    const confirmDialog = this.dialog.open(ConfirmDialogComponent);
    confirmDialog.componentInstance.init('¿Desea realizar la venta?');
    confirmDialog.afterClosed().subscribe(
      confirmed => confirmed ? this.finish() : undefined
    );
  }


  get total() {
    let total = 0;
    this.addedProducts.forEach(addedProduct => {
      total += addedProduct.inventory.current_price * addedProduct.quantity;
    });
    return Math.trunc(total * 100) / 100;
  }


  finish() {
    const products = [];
    this.addedProducts.forEach(productSale => {
      products.push({
        product_id: productSale.inventory.product.id,
        quantity: productSale.quantity
      });
    });

    if (this.selectedPaymentType.payment_type_id === 1) {
      this.selectedPaymentType.card_payment_id = null;
    }

    this.saleService.post(this.branch_id, {
      client_id: this.client_id,
      payment_type_id: this.selectedPaymentType.payment_type_id,
      card_payment_id: this.selectedPaymentType.card_payment_id,
      total: this.total,
      client_payment: this.payment,
      products: products
    }).subscribe(
      sale => {
        if (this.print) {
          this.ticketService.putSale(sale);
        }
        this.notify.success('Éxito', this.messages.saleSuccess);
      },
      error => this.notifyError(error),
      () => this.clear()
    );

  }

  clear() {
    this.clearSearchInputs();
    this.addedProducts = [];
    this.payment = null;
    this.client_id = 1;
    this.selectedPaymentType.payment_type_id = 1;
    this.selectedPaymentType.card_payment_id = null;
    this.findProduct.clear();
  }

  cancel() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent);
    confirmDialog.componentInstance.init(this.messages.cancelSale.title, this.messages.cancelSale.message);
    confirmDialog.afterClosed().subscribe(
      confirmed => confirmed ? this.clear() : undefined
    );
  }

  notifyError(error) {
    if (error.code == 10) {
      this.notify.alert('Alerta', error.message);
    } else {
      this.notify.error('Error', error.message);
    }
  }
}

interface ProductSale {
  inventory: Inventory;
  quantity: number;
}
