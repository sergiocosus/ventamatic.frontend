import { Component, OnInit } from '@angular/core';
import {Sale} from '../classes/sale';
import {TicketService} from '../services/ticket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: 'ticket.component.html',
  styleUrls: ['ticket.component.scss']
})
export class TicketComponent implements OnInit {
  sale: Sale;

  constructor(private ticketServise: TicketService) {}

  ngOnInit() {
    this.ticketServise.getSale().subscribe(sale => {
      this.sale = sale;
      if (sale) {
        setTimeout(window.print, 500);
      }
    });
  }

}
