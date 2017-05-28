import { Component, OnInit, Input } from '@angular/core';
import {Sale} from "../shared/sale";
import {TicketService} from "./ticket.service";

@Component({
  selector: 'app-ticket',
  templateUrl: 'ticket.component.html',
  styleUrls: ['ticket.component.scss']
})
export class TicketComponent implements OnInit {
  sale:Sale;

  constructor(private ticketServise:TicketService) {}

  ngOnInit() {
    this.ticketServise.getSale().subscribe(sale => {
      this.sale = sale;
      if(sale){
        setTimeout(window.print, 500);
      }
    })
  }

}
