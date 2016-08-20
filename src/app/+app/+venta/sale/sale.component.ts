import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Control,  } from "@angular/common";
import { ActivatedRoute, Router} from "@angular/router";
import { REACTIVE_FORM_DIRECTIVES } from "@angular/forms";
import {BUTTON_DIRECTIVES} from "ng2-bootstrap/ng2-bootstrap";

import {Branch} from "../../+sucursales/shared/branch";
import {SaleService} from "../shared/sale.service";
import {NotificationsService} from "angular2-notifications/lib/notifications.service";
import {ClientService} from "../../+clientes/shared/client.service";
import {Client} from "../../+clientes/shared/client";
import {MainContentComponent} from "../../../shared/main-content/main-content.component";
import {Inventory} from "../../../shared/inventory/inventory";
import {SaleConfirmModalComponent} from "../sale-confirm-modal/sale-confirm-modal.component";
import {ScheduleService} from "../../../user/schedule/schedule.service";
import {InputLabelComponent} from "../../../components/input-label/input-label.component";
import {TicketService} from "../ticket/ticket.service";
import {ProductCartComponent} from "../../../shared/product/product-cart/product-cart.component";
import {FindProductComponent} from "../../../shared/product/find-product/find-product.component";

@Component({
  moduleId: module.id,
  selector: 'app-sale',
  templateUrl: 'sale.component.html',
  styleUrls: ['sale.component.css'],
  directives: [
    MainContentComponent,
    FindProductComponent,
    SaleConfirmModalComponent,
    InputLabelComponent,
    ProductCartComponent,
    BUTTON_DIRECTIVES,
    REACTIVE_FORM_DIRECTIVES,
  ]
})
export class SaleComponent implements OnInit, OnDestroy {
  @ViewChild(SaleConfirmModalComponent) protected saleConfirmModal:SaleConfirmModalComponent;
  @ViewChild(FindProductComponent) protected findProduct:FindProductComponent;

  private scheduleSubscription;

  addedProducts:ProductSale[] = [];

  branch:Branch;
  branch_id:number;

  client_id:number = 1;
  clientIdControl:Control = new Control();
  client:Client;
  client_status:string;

  payment:number = null;
  paymentTypes = [
    {
      label: 'Efectivo',
      value: 1
    },
    {
      label: 'Tarjeta',
      value: 2
    }
  ];
  payment_type_id:number = 1;
  card_payment_id:string = null;

  print = true;

  private messages = {
    cancelSale: "¿Está seguro de cancelar la venta?\nLos datos de la venta actual serán borrados",
    clientNotExists: 'El cliente no existe',
    clientInvalid: 'No se ha seleccionado un cliente válido',
    noProductsAdded: 'No se han agregado productos',
    lowInventory: 'Insuficiente producto en inventario',
    paymentInvalid: 'El pago es inferior al monto Total',
    saleSuccess: '¡Venta completada satisfactoriamente!',
    searching: "Buscando..."
  };

  private sub;

  constructor(private route:ActivatedRoute,
              private clientService:ClientService,
              private notificationService:NotificationsService,
              private saleService:SaleService,
              private router:Router,
              private scheduleService:ScheduleService,
              private ticketService:TicketService
  ) {
    this.initClientIdControl();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.branch_id = params['branch_id'];

      this.scheduleSubscription = this.scheduleService.getCurrentSchedule().subscribe(
        schedule => {
          if(schedule){
            if(schedule.branch_id == this.branch_id){
              this.branch = schedule.branch;
            }else{
              this.router.navigate(['/app/venta', schedule.branch_id]);
            }
          }else {
            this.router.navigate(['/app/venta']);
          }
        }
      );
    });
  }

  ngOnDestroy(): any {
    this.sub.unsubscribe();
    this.scheduleSubscription.unsubscribe();
  }

  private initClientIdControl(){
    this.clientIdControl.valueChanges.distinctUntilChanged()
      .subscribe(value => {
        this.client = null;
        this.client_status = this.messages.searching;
      });

    this.clientIdControl.valueChanges.debounceTime(250).distinctUntilChanged()
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





  addProduct(inventory){
    var exist = this.addedProducts.filter(productSale =>{
      return productSale.inventory.product.id == inventory.product.id
    });

    if(exist.length){
      if(inventory.quantity > exist[0].quantity){
        exist[0].quantity++;
      } else {
        this.notificationService.error(
          'Error', this.messages.lowInventory
        );
      }
    } else{
      if(inventory.quantity > 0){
        this.addedProducts.push({
          inventory: inventory,
          quantity: 1
        });
      }else{
        this.notificationService.error(
          'Error', this.messages.lowInventory
        );
      }
    }

    this.clearSearchInputs();
  }



  private clearSearchInputs(){
    this.findProduct.clear();
  }

  confirm(){
    if(!this.client){
      this.notificationService.error(
        'Error', this.messages.clientInvalid
      );
      return
    }
    if(!this.addedProducts.length){
      this.notificationService.error(
        'Error', this.messages.noProductsAdded);
      return;
    }
   /* if(this.paymentChange < 0){
      this.notificationService.error(
        'Error', this.messages.paymentInvalid);
      return;
    }*/

    this.saleConfirmModal.open();
  }


  get total(){
    var total = 0;
    this.addedProducts.forEach(addedProduct => {
      total += addedProduct.inventory.correctPrice * addedProduct.quantity;
    });
    return total;
  }


  finish(){
    var products = [];
    this.addedProducts.forEach(productSale => {
      products.push({
        product_id: productSale.inventory.product.id,
        quantity: productSale.quantity
      })
    });

    if(this.payment_type_id == 1){
      this.card_payment_id = null;
    }

    this.saleService.post(this.branch_id, {
      client_id: this.client_id,
      payment_type_id: this.payment_type_id,
      card_payment_id: this.card_payment_id,
      total: this.total,
      client_payment: this.payment,
      products: products
    }).subscribe(
      sale => {
        if(this.print){
          this.ticketService.putSale(sale);
        }
        this.notificationService.success('Éxito', this.messages.saleSuccess);
      },
      error => this.notifyError(error),
      () => this.clear()
    );

  }

  clear(){
    this.clearSearchInputs();
    this.addedProducts = [];
    this.payment = null;
    this.client_id = 1;
    this.payment_type_id = 1;
    this.card_payment_id = null;
    this.findProduct.clear();
  }

  cancel(){
    if(confirm(this.messages.saleSuccess)){
      this.clear();
    }
  }

  notifyError(error){
    if(error.code == 10){
      this.notificationService.alert('Alerta',error.message);
    }else{
      this.notificationService.error('Error', error.message);
    }
  }
}

interface ProductSale {
  inventory:Inventory;
  quantity:number;
}
