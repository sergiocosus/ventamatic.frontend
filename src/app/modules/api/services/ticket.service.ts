import { Injectable } from '@angular/core';
import {ReplaySubject} from 'rxjs';
import {Sale} from '../models/sale';


@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private saleReplaySubject: ReplaySubject<Sale>;
  private sale: Sale;
  constructor() {
    this.saleReplaySubject = new ReplaySubject<Sale>(1);
    this.saleReplaySubject.subscribe(sale => console.warn(sale));
  }

  getSale() {
    return this.saleReplaySubject;
  }

  putSale(sale: Sale) {
    this.sale = sale;
    this.saleReplaySubject.next(sale);
    if (sale) {
      setTimeout(window.print, 500);
    }
  }

}
