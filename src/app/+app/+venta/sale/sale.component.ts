import { Component, OnInit } from '@angular/core';
import { Control } from "@angular/common";
import { OnActivate, RouteSegment, RouteTree } from "@angular/router";

import {BranchService} from "../../+sucursales/shared/branch.service";
import {Branch} from "../../+sucursales/shared/branch";
import {Product} from "../../../shared/product/product";
import {SaleService} from "../shared/sale.service";
import {NotificationsService} from "angular2-notifications/lib/notifications.service";
import {ClientService} from "../../+clientes/shared/client.service";
import {ProductService} from "../../../shared/product/product.service";
import {Client} from "../../+clientes/shared/client";
import {MainContentComponent} from "../../../shared/main-content/main-content.component";
import {FloatingLabelComponent} from "../../../components/floating-label/floating-label.component";
import {AutocompleteInputComponent} from "../../../components/autocomplete-input/autocomplete-input.component";
import {InventoryService} from "../../../shared/inventory/inventory.service";
import {Inventory} from "../../../shared/inventory/inventory";

@Component({
  moduleId: module.id,
  selector: 'app-sale',
  templateUrl: 'sale.component.html',
  styleUrls: ['sale.component.css'],
  directives: [
    FloatingLabelComponent,
    MainContentComponent,
    AutocompleteInputComponent,
  ],
  providers: [SaleService]
})
export class SaleComponent implements OnActivate {
  addedProducts:ProductSale[] = [];

  branch:Branch;

  branch_id:number;
  client_id:number;
  client:Client;
  client_status:string;
  bar_code:string;


  product_id:number;
  clientPayment:number = 0;
  payment_type_cash:boolean = true;
  payment_type_card:boolean;
  payment_type:number;

  searchMethod;
  constructor(private clientService:ClientService,
              private notificationService:NotificationsService,
              private saleService:SaleService,
              private branchService:BranchService,
              private inventoryService:InventoryService) {
    this.searchMethod = (words) => this.inventoryService.search(this.branch_id, words);
  }

  routerOnActivate(curr:RouteSegment,RouteSegment, currTree?: RouteTree, prevTree?: RouteTree):void {
    this.branch_id = +curr.getParam('branch_id');

    this.branchService.get(this.branch_id )
      .subscribe(
        branch => this.branch = branch,
        error => this.notifyError(error)
      );
  }

  get total(){
    var total = 0;
    this.addedProducts.forEach(addedProduct => {
      total += addedProduct.inventory.correctPrice * addedProduct.quantity;
    });
    return total;
  }

  get paymentChange(){
    return this.clientPayment - this.total;
  }

  updateClient(){
    this.client = null;
    this.client_status = "Buscando...";
    if(this.client_id != null){
      this.clientService.get(this.client_id).subscribe(
        client => {
          this.client = client;
          this.client_status = null;
        },
        error => this.client_status = 'El cliente no existe'
      );
    } else {

    }

  }


  barCodeEntered($event){
   if($event.keyIdentifier=='Enter'){
      if(this.bar_code && this.bar_code.length){
        this.inventoryService.getByBarCode(this.branch_id, this.bar_code).subscribe(
          inventory => {


            
            this.addProduct(inventory);
          },
          error => this.notifyError(error)
        );
      } else {
        this.notificationService.alert('Alerta','El código de barras se encuentra vacío');
      }
    }
  }

  idEntered($event) {
    if ($event.code == 'Enter') {
      if(!isNaN(this.product_id)){
        this.inventoryService.get(this.branch_id, this.product_id).subscribe(
          inventory => this.addProduct(inventory),
          error => this.notifyError(error)
        );
      } else {
        this.notificationService.alert('Alerta','El ID se encuentra vacío');
      }
    }
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
          'Error', 'Insuficiente producto en inventario'
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
          'Error', 'Insuficiente producto en inventario'
        );
      }
    }

    this.clearSearchInputs();
  }


  removeProduct(productSale){
    var index = this.addedProducts.indexOf(productSale);
    if (index > -1) {
      this.addedProducts.splice(index, 1);
    }
  }

  private clearSearchInputs(){
    // this.search_words = "";
    this.product_id = null;
    this.bar_code = "";
  }

  finish(){
    if(!this.client){
      this.notificationService.error(
        'Error', 'No se ha seleccionado un cliente válido'
      );
      return
    }
    if(!this.addedProducts.length){
      this.notificationService.error(
        'Error','No se han agregado productos');
      return;
    }
    if(this.paymentChange < 0){
      this.notificationService.error(
        'Error','El pago es inferior al monto Total');
      return;
    }


    var payment_type_id;

    if(this.payment_type_cash){
      payment_type_id = 1;
    } else if (this.payment_type_card){
      payment_type_id = 2;
    }

    var products = [];
    this.addedProducts.forEach(productSale => {
      products.push({
        product_id: productSale.inventory.product.id,
        quantity: productSale.quantity
      })
    });

    this.saleService.post(this.branch_id, {
      client_id: this.client_id,
      payment_type_id: payment_type_id,
      card_payment_id: null,
      total: this.total,
      client_payment: this.clientPayment,
      products: products
    }).subscribe(
      response => {
        console.log(response)
        this.notificationService.success('Éxito', 'Venta completada!');
      },
      error => this.notifyError(error)
    );

    this.clear();

  }

  clear(){
    this.clearSearchInputs();
    // this.productSuggestions = [];
    this.addedProducts = [];
    this.clientPayment = 0;
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
  inventory:Inventory,
  quantity:number;
}
