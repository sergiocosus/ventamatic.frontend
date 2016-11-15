import { Injectable } from '@angular/core';
import {ApiHttp} from "../api-http";
import {Model} from "../model";
import { CsvService } from 'angular2-json2csv';
import {NotifyService} from '../../services/notify.service';

@Injectable()
export class ReportService {

  private basePath= 'report/';

  constructor(private apiHttp:ApiHttp,
              private csvService:CsvService,
              private noty:NotifyService) {}

  getSchedule(params?:any){
    return this.apiHttp.get(this.basePath + 'schedule', params)
      .map(res => {
        res.schedules.forEach(
          schedule => {
            schedule.created_at = Model.parseDateTime(schedule.created_at);
            schedule.updated_at = Model.parseDateTime(schedule.updated_at);
          }
        );
        return res.schedules;
      });
  }
  getSale(params?:any){
    return this.apiHttp.get(this.basePath + 'sale', params)
      .map(res => {
        res.sales.forEach(
          sale => {
            sale.created_at = Model.parseDateTime(sale.created_at);
          }
        );
        return res.sales;
      });
  }

  getBuy(params?:any){
    return this.apiHttp.get(this.basePath + 'buy', params)
      .map(res => {
        res.buys.forEach(
          buy => {
            buy.created_at = Model.parseDateTime(buy.created_at);
          }
        );
        return res.buys;
      });
  }

  getInventoryMovements(params?:any){
    return this.apiHttp.get(this.basePath + 'inventory-movements', params)
      .map(res => {
        res.inventory_movements.forEach(
          inventory_movement => {
            inventory_movement.created_at = Model.parseDateTime(inventory_movement.created_at);
          }
        );
        return res.inventory_movements;
      });
  }

  getInventory(params?:any){
    return this.apiHttp.get(this.basePath + 'inventory', params)
      .map(res => res.inventories);
  }

  getHistoricInventory(params?:any){
    return this.apiHttp.get(this.basePath + 'historic-inventory', params)
      .map(res => res.inventories);
  }

  downloadCSV(data, filename) {
    if(data && data.length){
      this.csvService.download(data, filename);
    } else {
      this.noty.error("Reporte vacío, realice otra consulta para poder exportar a CSV");
    }
  }

  formatDate(date) {
    if (date) {
      return Model.parseDateTime(date).toISOString()
    } else {
      return '';
    }
  }
}