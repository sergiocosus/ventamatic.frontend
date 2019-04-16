
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Client} from '../classes/client';
import {ApiHttp} from '../../shared/services/api-http';

@Injectable()
export class ClientService {
  private basePath = 'client/';

  constructor(private apiHttp: ApiHttp) {}

  getAll(params?: any) {
    return this.apiHttp.get(this.basePath, params).pipe(
      map(res =>  <Client[]>res.clients));
  }

  get(client_id: number) {
    return this.apiHttp.get(this.basePath + client_id).pipe(
      map(res => {return new Client().parse(res.client); }));
  }

  getSearch(search: string) {
    return this.apiHttp.get(this.basePath + 'search', {search: search}).pipe(
      map(res => Client.parseArray(res.clients)));
  }

  post(clie: Client) {
    return this.apiHttp.post(this.basePath, clie).pipe(
      map(res => {return <Client>res.client; }));
  }

  delete(client_id: number) {
    return this.apiHttp.delete(this.basePath + client_id);
  }

  restore(client_id: number) {
    return this.apiHttp.patch(this.basePath + client_id + '/restore', {}).pipe(
      map(data => new Client().parse(data.client)));
  }

  put(client: Client) {
    return this.apiHttp.put(this.basePath + client.id, client).pipe(
      map(res => {return <Client>res.client; }));
  }
}
