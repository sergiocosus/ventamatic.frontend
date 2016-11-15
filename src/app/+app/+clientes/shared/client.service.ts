import { Injectable } from '@angular/core';
import {ApiHttp} from "../../../shared/api-http";
import {Client} from "./client";

@Injectable()
export class ClientService {
  private basePath = 'client/';

  constructor(private apiHttp:ApiHttp) {}

  getAll() {
    return this.apiHttp.get(this.basePath)
      .map(res => {console.log(res);return <Client[]>res.suppliers});
  }

  get(client_id:number) {
    return this.apiHttp.get(this.basePath + client_id)
      .map(res => {return new Client().parse(res.client)});
  }

  getSearch(search:string) {
    return this.apiHttp.get(this.basePath + 'search', {search: search})
      .map(res => Client.parseArray(res.clients));
  }

  post(clie:Client){
    return this.apiHttp.post(this.basePath, clie)
      .map(res => {return <Client>res.client});
  }

  delete(client_id:number){
    return this.apiHttp.delete(this.basePath + client_id);
  }

  put(client:Client){
    return this.apiHttp.put(this.basePath + client.id, client)
      .map(res => {return <Client>res.client});
  }
}
