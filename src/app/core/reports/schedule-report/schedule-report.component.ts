import {Component, OnInit, ViewChild} from '@angular/core';
import {ReportService} from '../../../modules/api/services/report.service';
import {NotifyService} from '../../../shared/services/notify.service';
import {IMyDateRangeModel} from 'mydaterangepicker';
import {messages} from '../../../shared/classes/messages';
import {MatPaginator} from '@angular/material';
import {ReportDataSource} from '../../../modules/report/classes/report-data-source';

@Component({
  selector: 'app-schedule-report',
  templateUrl: './schedule-report.component.html',
  styleUrls: ['./schedule-report.component.scss']
})
export class ScheduleReportComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  schedules = [];

  request: {
    id: number,
    branch_id: number,
    user_id: number,
    begin_at: string,
    end_at: string
  };

  rangeOptions = {
    editableDateRangeField: true
  };

  dataSource: ReportDataSource | null;

  constructor(private reportService: ReportService,
              private notify: NotifyService) { }

  ngOnInit() {
    this.dataSource = new ReportDataSource(this.paginator);
    this.resetRequest();
  }

  resetRequest() {
    this.request = {
      id: null,
      branch_id: null,
      user_id: null,
      begin_at: null,
      end_at: null,
    };
  }

  onDateRangeChanged($event: IMyDateRangeModel) {
    this.reportService.formatRange(this.request, $event);
  }

  submit() {
    this.reportService.getSchedule(this.request).subscribe(
      schedules => {
        this.schedules = schedules;
        if (!this.schedules.length) {
          this.notify.alert(messages.report.voidBody, messages.report.voidTitle);
        }
        this.dataSource.setData(schedules);
      },
      error => this.notify.serviceError(error)
    );
  }

  downloadCSV() {
    this.reportService.downloadCSV(this.schedules.map(
      schedule => ({
        id: schedule.id,
        sucursal_id: schedule.branch_id,
        sucursal_nombre: schedule.branch.name,
        usuario_nombre: schedule.user.name,
        usuario_apellido_paterno: schedule.user.last_name,
        usuario_apellido_materno: schedule.user.last_name_2,
        usuario_id: schedule.user_id,
        monto_inicial: schedule.initial_amount,
        monto_del_sistema: schedule.system_amount,
        monto_final: schedule.final_amount,
        estado: schedule.schedule_status.name,
        nota: schedule.note,
        creado: this.reportService.formatDateTime(schedule.created_at),
        creado_fecha: this.reportService.formatDate(schedule.created_at),
        creado_hora: this.reportService.formatTime(schedule.created_at),
        terminado: this.reportService.formatDateTime(schedule.updated_at),
        terminado_fecha: this.reportService.formatDate(schedule.updated_at),
        terminado_hora: this.reportService.formatTime(schedule.updated_at),
      })
    ), `turnos-${new Date().toISOString()}`);
  }
}
