import {Component, OnInit, ViewChild} from '@angular/core';
import {Product} from "../../shared/product/product";
import {ProductBuy} from "../../shared/buy/product-buy";
import {AddProductModalComponent} from "./add-product-modal/add-product-modal.component";
import {FindProductComponent} from "../../shared/product/find-product/find-product.component";
import {BuyService, BuyRequest} from "../../shared/buy/buy.service";
import {BeginBuyDataInterface, BeginBuyModalComponent} from "../../shared/buy/begin-buy-modal/begin-buy-modal.component";
import {NotificationsService} from "angular2-notifications";
import {ModalComponent} from "ng2-bs3-modal/components/modal";

@Component({
  selector: 'app-compra',
  templateUrl: 'compra.component.html',
  styleUrls: ['compra.component.scss'],
})
export class CompraComponent implements OnInit {
  @ViewChild(AddProductModalComponent) addProductModal:AddProductModalComponent;
  @ViewChild(FindProductComponent) findProduct:FindProductComponent;
  @ViewChild(BeginBuyModalComponent) beginBuyModal: BeginBuyModalComponent;
  @ViewChild('confirmBuyModal') confirmBuyModal: ModalComponent;

  initialData:BeginBuyDataInterface;
  addedProducts:ProductBuy[] = [];
  iva:number;
  ieps:string;

  selectedPaymentType = {
    payment_type_id: 1,
    card_payment_id: null,
  };

  messages = {
    success: '¡Compra completada satisfactoriamente!',
    cancel: '¿Está seguro de cancelar la compra?',
    confirm: '¿Está seguro de completar la compra?',
    totalMismatch: 'El total introducido es diferente al total calculado'
  };

  constructor(private buyService:BuyService,
              private notificationService:NotificationsService) {}

  ngOnInit() {
    this.beginBuyModal.open();
  }

  startBuy(initialData:BeginBuyDataInterface){
    if (initialData && initialData.branch && initialData.supplier
        && initialData.introducedAmount && initialData.supplierBillID) {
      this.initialData = initialData;
    } else {
      setTimeout(() => this.beginBuyModal.open(), 500 );
    }
  }

  addProduct(product){
    var existProduct:ProductBuy = this.findProductInCart(product);

    if(existProduct){
      this.addProductModal.open(existProduct);
    } else{
      this.addProductModal.open({
        product: product,
        cost: null,
        quantity: null
      });
    }

   //this.clearSearchInputs();
  }

  findProductInCart(product:Product) {
    var existProduct:ProductBuy = null;

    this.addedProducts.some(addedProduct => {
      if (addedProduct.product.id == product.id) {
        existProduct = addedProduct;
        return true;
      }
    });

    return existProduct;
  }

  openBuyConfirm(){
    if(this.initialData.introducedAmount != this.getTotal()) {
      this.notificationService.error('Error', this.messages.totalMismatch);
    } else {
      this.confirmBuyModal.open();
    }
  }

  buy(){
    this.buyService.post(this.initialData.branch.id,{
      iva:this.iva,
      ieps: this.ieps,
      supplier_id: this.initialData.supplier.id,
      supplier_bill_id: this.initialData.supplierBillID,
      payment_type_id: this.selectedPaymentType.payment_type_id,
      card_payment_id: this.selectedPaymentType.card_payment_id,
      total: this.getTotal(),
      products: this.getProductsForRequest()
    }).subscribe(
      buy => {
        this.notificationService.success('Éxito', this.messages.success);
        this.cancel();
      }
    )
  }

  addProductToCart(productBuy:ProductBuy){
    if(!this.findProductInCart(productBuy.product)) {
      this.addedProducts.push(productBuy);
      this.findProduct.setFocus();
    }
  }

  private getProductsForRequest() {
    return this.addedProducts.map(
      (productBuy:ProductBuy) => {
        return {
          product_id: productBuy.product.id,
          cost: productBuy.cost,
          quantity: productBuy.quantity
        }
      }
    )
  }

  private getTotal(){
    var total = 0;
    this.addedProducts.forEach(
      (productBuy:ProductBuy) => {
        total += productBuy.quantity * productBuy.cost;
      }
    );
    return total;
  }

  cancel(){
    this.findProduct.clear();
    this.iva = null;
    this.ieps = null;
    this.addedProducts = [];
    this.beginBuyModal.clear();
    this.beginBuyModal.open();
    this.selectedPaymentType.card_payment_id = null;
    this.selectedPaymentType.payment_type_id = 1;
  }
}


