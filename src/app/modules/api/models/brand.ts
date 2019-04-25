import { Model } from '@app/api/models/model';

export class Brand extends Model {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;

  public static parseArray(objs: any) {
    return objs.map(obj => {return new Brand().parse(obj); });
  }
}
