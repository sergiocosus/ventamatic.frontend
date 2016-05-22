import { Injectable } from '@angular/core';
import {ApiHttp} from "../../../shared/api-http";
import {Supplier} from "./supplier";

@Injectable()
export class SupplierService {
  private basePath = 'supplier/';

  constructor(private apiHttp:ApiHttp) {}

  getAll() {
    return this.apiHttp.get(this.basePath)
      .map(res => {console.log(res);return <Supplier[]>res.suppliers});
  }

  get(supplier_id:number) {
    return this.apiHttp.get(this.basePath + supplier_id)
      .map(res => {return <Supplier>res.supplier});
  }

  post(supplier:Supplier){
    return this.apiHttp.post(this.basePath, supplier)
      .map(res => {return <Supplier>res.supplier});
  }

  delete(supplier_id:number){
    return this.apiHttp.delete(this.basePath + supplier_id);
  }

  put(supplier:Supplier){
    return this.apiHttp.put(this.basePath + supplier.id, supplier)
      .map(res => {return <Supplier>res.supplier});
  }
}
