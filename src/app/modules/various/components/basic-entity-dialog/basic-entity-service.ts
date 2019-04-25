export interface BasicEntityService {
  getAll(params?: any);
  getAllCached(params?: any, refresh?: boolean);
  post(entity: any);
  put(entity: any);
  delete(id: number);
  restore(id: number);
}
