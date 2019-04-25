import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private basePath = 'client/';

  constructor(private httpClient: HttpClient) {
  }

  getAll(params?: any) {
    return this.httpClient.get(this.basePath, params)
      .pipe(this.mapClients());
  }

  get(client_id: number) {
    return this.httpClient.get(this.basePath + client_id)
      .pipe(this.mapClients());
  }

  getSearch(search: string) {
    return this.httpClient.get(this.basePath + 'search', {params: {search}})
      .pipe(this.mapClients());
  }

  post(clie: Client) {
    return this.httpClient.post(this.basePath, clie)
      .pipe(this.mapClient());
  }

  delete(client_id: number) {
    return this.httpClient.delete(this.basePath + client_id);
  }

  restore(client_id: number) {
    return this.httpClient.patch(this.basePath + client_id + '/restore', {})
      .pipe(this.mapClient());
  }

  put(client: Client) {
    return this.httpClient.put(this.basePath + client.id, client)
      .pipe(this.mapClient());
  }

  protected mapClient() {
    return map(response => new Client().parse(response['client']));
  }

  protected mapClients() {
    return map(response => Client.parseArray(response['clients']));
  }
}
