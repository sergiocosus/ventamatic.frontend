import { Injectable, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificationsService, NotificationType } from 'angular2-notifications';


@Injectable()
export class NotifyService {

  constructor(private notification: NotificationsService,
              private satinizer: DomSanitizer) {
    console.log(this.notification);
  }

  success(content: string, title: string = 'Éxito', override?: any) {
    return this.notification.success(title, content, override);
  }

  error(content: string, title: string = 'Error', override?: any ) {
    return this.notification.error(title, content, override);
  }

  alert(content: string, title: string = 'Alerta', override?: any) {
    return this.notification.alert(title, content, override);
  }

  info(content: string, title: string = 'Información', override?: any) {
    return this.notification.info(title, content, override);
  }

  bare(content: string, title: string = 'Bare', override?: any) {
    return this.notification.bare(title, content, override);
  }

  create(title: string, content: string, type: NotificationType, override?: any) {
    return this.notification.create(title, content, type, override);
  }

  html(html: any, type: NotificationType, override?: any) {
    return this.notification.html(html, type, override);
  }

  remove(id?: string): void {
    this.notification.remove(id);
  }

  serviceError(json: any) {
    const message = this.satinizer.sanitize(SecurityContext.HTML, json.message);
    const code = this.satinizer.sanitize(SecurityContext.HTML, json.code);

    const html = this.satinizer.bypassSecurityTrustHtml(`
      <div class="sn-title">Error</div>
      <div class="sn-content">
        ${message} </br>Code: ${code}
      </div>
  `);
    return this.html(html, NotificationType.Error);
  }

}
