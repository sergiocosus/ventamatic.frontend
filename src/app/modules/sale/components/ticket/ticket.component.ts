import { Component, OnInit } from '@angular/core';
import {Sale} from '@app/api/models/sale';
import {TicketService} from '@app/api/services/ticket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
  sale: Sale;

  constructor(private ticketServise: TicketService) {}

  ngOnInit() {
    this.ticketServise.getSale().subscribe(sale => {
      this.sale = sale;
    });
  }

}
