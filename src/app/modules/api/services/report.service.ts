import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { IMyDateRangeModel } from 'mydaterangepicker';
import * as moment from 'moment';
import { NotifyService } from '@app/shared/services/notify.service';
import { Inventory } from '../models/inventory.model';
import { HttpClient } from '@angular/common/http';
import { Model } from '@app/api/models/model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private basePath = 'report/';

  constructor(private httpClient: HttpClient,
              // private csvService: CsvService,
              private noty: NotifyService) {
  }

  getSchedule(params?: any) {
    return this.httpClient.get(this.basePath + 'schedule', params).pipe(
      map(res => {
        res['schedules'].forEach(
          schedule => {
            schedule.created_at = Model.parseDateTime(schedule.created_at);
            schedule.updated_at = Model.parseDateTime(schedule.updated_at);
          }
        );
        return res['schedules'];
      }));
  }

  getSale(params?: any) {
    return this.httpClient.get(this.basePath + 'sale', params).pipe(
      map(res => {
        res['sales'].forEach(
          sale => {
            sale.created_at = Model.parseDateTime(sale.created_at);
          }
        );
        return res['sales'];
      }));
  }

  getBuy(params?: any) {
    return this.httpClient.get(this.basePath + 'buy', params).pipe(
      map(res => {
        res['buys'].forEach(
          buy => {
            buy.created_at = Model.parseDateTime(buy.created_at);
          }
        );
        return res['buys'];
      }));
  }

  getInventoryMovements(params?: any) {
    return this.httpClient.get(this.basePath + 'inventory-movements', params).pipe(
      map(res => {
        res['inventory_movements'].forEach(
          inventory_movement => {
            inventory_movement.created_at = Model.parseDateTime(inventory_movement.created_at);
          }
        );
        return res['inventory_movements'];
      }));
  }

  getInventory(params?: any) {
    return this.httpClient.get(this.basePath + 'inventory', params).pipe(
      map(res => Inventory.parseArray(res['inventories'])));
  }

  getHistoricInventory(params?: any) {
    return this.httpClient.get(this.basePath + 'historic-inventory', params).pipe(
      map(res => Inventory.parseArray(res['inventories'])));
  }

  downloadCSV(data, filename) {
    if (data && data.length) {
      // this.csvService.download(data, filename);
    } else {
      this.noty.error('Reporte vacío, realice otra consulta para poder exportar a CSV');
    }
  }

  formatDateTime(date) {
    if (date) {
      return Model.parseDateTime(date).toISOString();
    } else {
      return '';
    }
  }

  formatDate(date) {
    if (date) {
      return moment(Model.parseDateTime(date)).format('YYYY-MM-DD');
    } else {
      return '';
    }
  }

  formatTime(date) {
    if (date) {
      return moment(Model.parseDateTime(date)).format('HH:MM:SS');
    } else {
      return '';
    }
  }

  formatRange(request: any, $event: IMyDateRangeModel) {
    request.begin_at = moment.utc($event.beginJsDate).format('YYYY-MM-DD');
    request.end_at = moment.utc($event.endJsDate).format('YYYY-MM-DD');
  }

}
