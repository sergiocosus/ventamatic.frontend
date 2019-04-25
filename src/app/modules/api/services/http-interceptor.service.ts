import { Inject, Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';
import { throwError } from 'rxjs';
import { API_CONFIG, ApiConfig } from '@app/api/types/api-config';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  private apiUrl: string | undefined;

  constructor(@Inject(API_CONFIG) private config: ApiConfig,
              private localStorage: LocalStorageService
  ) {
    this.apiUrl = config.apiUrl;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      url: this.apiUrl + req.url
    });


    if (this.localStorage.get('access_token')) {
      req = req.clone({
        setHeaders: {
          'authorization': 'Bearer ' + this.localStorage.get('access_token'),
        }
      });
    }

    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          event = (event as HttpResponse<any>).clone({
            body: event.body.data
          });
        }

        return event;
      }),
      catchError((err: any, caught) => {
        if (err instanceof HttpErrorResponse) {
          return throwError(this.handleErrorResponse(err));
        }

        return throwError(err);
      })
    );
  }


  private handleErrorResponse(err: any) {
    return err;
  }
}
