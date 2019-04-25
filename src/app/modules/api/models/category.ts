import { Model } from '@app/api/models/model';

export class Category extends Model{
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;

  public static parseArray(objs: any) {
    return objs.map(obj => {return new Category().parse(obj); });
  }
}
