import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../shared/product/product.service";
import {FloatingLabelComponent} from "../../components/floating-label/floating-label.component";
import {Product} from "../../shared/product/product";
import {MainContentComponent} from "../../shared/main-content/main-content.component";
import {NotificationsService} from "angular2-notifications/lib/notifications.service";

@Component({
  moduleId: module.id,
  selector: 'app-venta',
  templateUrl: 'venta.component.html',
  styleUrls: ['venta.component.css'],
  directives: [FloatingLabelComponent, MainContentComponent]
})
export class VentaComponent implements OnInit {
  products:Product[] = [];
  product:Product;

  addedProducts:ProductSale[] = [];

  bar_code:string;
  search_words:string;
  product_id:number;

  quantity:number;
  subtotal:number;

  client_payment:number;
  payment_type:number;

  constructor(private productService:ProductService,
              private notificationService:NotificationsService) {}

  ngOnInit() {
  }

  get total(){
    var total = 0;
    this.addedProducts.forEach(addedProduct =>{
      total += addedProduct.product.price *  addedProduct.quantity;
    });
    return total;
  }

  get paymentChange(){
    return this.client_payment - this.total;
  }

  search(words){
    this.productService.search(words).subscribe(products =>
    {
      this.products = products;

      this.products.forEach(product =>{
        this.addedProducts.push({
          product: product,
          quantity: 2
        });
      });
      console.log(products);
    })
  }

  barCodeEntered($event){
    if($event.code=='Enter'){
      if(this.bar_code && this.bar_code.length){
          this.productService.getAll({bar_code: this.bar_code}).subscribe(products => {
          this.product = products[0];

          console.log(products[0]);
        });
      } else {
        this.notificationService.alert('Alerta','El código de barras se encuentra vacío');
      }
    }
  }

  idEntered($event) {
    if ($event.code == 'Enter') {
      console.log(this.product_id);
      if(!isNaN(this.product_id)){
        this.productService.get(+this.product_id).subscribe(
          product => this.product = product
        )
      } else {
        this.notificationService.alert('Alerta','El ID se encuentra vacío');
      }
    }
  }

  addProduct(){
    var exist = this.addedProducts.filter(productSale =>{
      return productSale.product.id == this.product.id
    });
    console.log(exist);
    if(exist.length){
      exist[0].quantity += this.quantity;
    } else{
      this.addedProducts.push({
        product: this.product,
        quantity: this.quantity
      });
    }
    this.product = null;
  }

}

interface ProductSale {
  product:Product,
  quantity:number;
}
