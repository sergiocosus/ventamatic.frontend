export interface BasicEntityService {
  getAll();
  post(entity:any);
  put(entity:any);
  delete(id:number);
}
