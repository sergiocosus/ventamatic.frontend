import { Injectable, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { NotificationsService } from 'angular2-notifications';
import {Notification} from "angular2-notifications/lib/notification";

@Injectable()
export class NotifyService {

  constructor(private notification:NotificationsService,
              private satinizer:DomSanitizer) {
  }

  success(content: string, title: string = 'Éxito', override?: any): Notification {
    return this.notification.success(title, content, override);
  }

  error(content: string, title: string = 'Error', override?: any ): Notification {
    return this.notification.error(title, content, override);
  }

  alert(content: string, title: string = 'Alerta', override?: any): Notification {
    return this.notification.alert(title, content, override);
  }

  info(content: string, title: string = 'Información', override?: any): Notification {
    return this.notification.info(title, content, override);
  }

  bare(content: string, title: string = 'Bare', override?: any): Notification {
    return this.notification.bare(title, content, override);
  }

  create(title: string, content: string, type: string, override?: any): Notification {
    return this.notification.create(title, content, type, override);
  }

  html(html: any, type: string, override?: any): Notification {
    return this.notification.html(html, type, override);
  }

  remove(id?: string): void {
    this.notification.remove(id);
  }

  serviceError(json: any) {
    var message = this.satinizer.sanitize(SecurityContext.HTML,json.message);
    var code = this.satinizer.sanitize(SecurityContext.HTML,json.code);

    var html = this.satinizer.bypassSecurityTrustHtml(`
      <div class="sn-title">Error</div>
      <div class="sn-content">
        ${message} </br>Code: ${code}
      </div>
  `);
    return this.html(html,'error');
  }

}
