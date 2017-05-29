export interface BasicEntityService {
  getAll(params?: any);
  post(entity:any);
  put(entity:any);
  delete(id:number);
  restore(id:number);
}
